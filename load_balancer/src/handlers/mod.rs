use crate::load::LoadBalancer;
use axum::{
    body::Body,
    extract::Path,
    http::{Request, StatusCode},
    response::IntoResponse,
};
use std::sync::Arc;
pub async fn handler(
    _: Path<String>,
    state: axum::extract::State<Arc<LoadBalancer>>,
    req: Request<Body>,
) -> impl IntoResponse {
    let target_server = state.get_next_server();

    // Xây dựng URI đích
    let path = req.uri().path();
    let query = req
        .uri()
        .query()
        .map(|q| format!("?{}", q))
        .unwrap_or_default();
    let uri = format!("{}{}{}", target_server, path, query);

    // Only log if debug_mode is enabled
    if state.is_debug_mode() {
        println!("Forwarding request to: {}", uri);
        println!("Method: {}", req.method());
        println!("Headers: {:?}", req.headers());
    }

    // Chuyển tiếp request
    match state
        .get_client()
        .request(req.method().clone(), uri)
        .send()
        .await
    {
        Ok(resp) => {
            // Xử lý response
            let status = resp.status();
            let body_bytes = resp.bytes().await.unwrap_or_default();

            if state.is_debug_mode() {
                println!("Response status: {}", status);
                println!("Response size: {} bytes", body_bytes.len());
            }

            (status, body_bytes.to_vec()).into_response()
        }
        Err(e) => {
            println!("Error forwarding request: {}", e);
            (StatusCode::BAD_GATEWAY, "Bad Gateway".to_string()).into_response()
        }
    }
}
