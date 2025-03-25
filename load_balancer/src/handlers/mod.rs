use crate::load::LoadBalancer;
use axum::{
    body::Body,
    extract::Path,
    http::{header, Request, StatusCode},
    response::IntoResponse,
};
use hyper::body::to_bytes;
use serde_json::{from_slice, json, Value};
use std::sync::Arc;
use std::time::Duration;

pub async fn handler(
    _: Path<String>,
    state: axum::extract::State<Arc<LoadBalancer>>,
    mut req: Request<Body>,
) -> impl IntoResponse {
    let target_server = state.get_next_server().trim_end_matches('/').to_string();
    let path = req.uri().path().trim_end_matches('/');
    let query = req
        .uri()
        .query()
        .map(|q| format!("?{}", q))
        .unwrap_or_default();
    let uri = format!("{}{}{}", target_server, path, query);

    if state.is_debug_mode() {
        println!("Forwarding request to: {}", uri);
        println!("Method: {}", req.method());
        println!("Headers: {:?}", req.headers());
    }

    // Lấy body từ request gốc
    let body_bytes = match to_bytes(req.body_mut()).await {
        Ok(bytes) => bytes,
        Err(e) => {
            eprintln!("Error reading request body: {}", e);
            let error_response = json!({
                "error": "Failed to read request body",
                "message": e.to_string()
            });
            return (
                StatusCode::BAD_REQUEST,
                [(header::CONTENT_TYPE, "application/json")],
                serde_json::to_string(&error_response).unwrap(),
            )
                .into_response();
        }
    };

    // Copy các headers từ request gốc
    let mut builder = reqwest::Client::new()
        .request(req.method().clone(), uri)
        .timeout(Duration::from_secs(30));

    // Copy tất cả headers từ request gốc
    for (key, value) in req.headers() {
        if key != header::HOST {
            // Bỏ qua header Host vì sẽ được tự động set
            builder = builder.header(key, value);
        }
    }

    // Thêm body vào request mới
    let response = builder.body(body_bytes).send().await;

    match response {
        Ok(resp) => {
            let status = resp.status();
            let is_json = resp
                .headers()
                .get(header::CONTENT_TYPE)
                .and_then(|v| v.to_str().ok())
                .map(|v| v.contains("application/json"))
                .unwrap_or(false);

            match resp.bytes().await {
                Ok(body_bytes) => {
                    if is_json {
                        match from_slice::<Value>(&body_bytes) {
                            Ok(json_value) => {
                                let formatted_json = serde_json::to_string_pretty(&json_value)
                                    .unwrap_or_else(|_| {
                                        String::from_utf8_lossy(&body_bytes).into_owned()
                                    });
                                if state.is_debug_mode() {
                                    println!("Response formatted as JSON");
                                }
                                return (
                                    status,
                                    [(header::CONTENT_TYPE, "application/json")],
                                    formatted_json,
                                )
                                    .into_response();
                            }
                            Err(_) => {
                                if state.is_debug_mode() {
                                    println!("Failed to parse JSON, returning raw response");
                                }
                            }
                        }
                    }
                    if state.is_debug_mode() {
                        println!("Response status: {}", status);
                        println!("Response size: {} bytes", body_bytes.len());
                    }
                    (status, body_bytes.to_vec()).into_response()
                }
                Err(e) => {
                    eprintln!("Error reading response body: {}", e);
                    let error_response = json!({
                        "error": "Failed to read response",
                        "message": e.to_string()
                    });
                    (
                        StatusCode::INTERNAL_SERVER_ERROR,
                        [(header::CONTENT_TYPE, "application/json")],
                        serde_json::to_string(&error_response).unwrap(),
                    )
                        .into_response()
                }
            }
        }
        Err(e) => {
            eprintln!("Error forwarding request: {}", e);
            let (status, message) = if e.is_timeout() {
                (StatusCode::GATEWAY_TIMEOUT, "Gateway Timeout")
            } else if e.is_connect() {
                (StatusCode::BAD_GATEWAY, "Connection Failed")
            } else {
                (StatusCode::BAD_GATEWAY, "Bad Gateway")
            };

            let error_response = json!({
                "error": message,
                "message": e.to_string()
            });

            (
                status,
                [(header::CONTENT_TYPE, "application/json")],
                serde_json::to_string(&error_response).unwrap(),
            )
                .into_response()
        }
    }
}
