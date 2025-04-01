use axum::{Router, routing::any};
use std::net::SocketAddr;
use std::sync::Arc;
mod config;
mod handlers;
mod load;
use config::Config;
use handlers::handler;
use load::LoadBalancer;
#[tokio::main]
async fn main() {
    // Khởi tạo cấu hình
    let config = Config::new();

    // Khởi tạo load balancer
    let load_balancer = Arc::new(LoadBalancer::new(config.servers, config.debug_mode));
    // Cấu hình router
    let app = Router::new()
        .route("/", any(handler))
        .route("/*path", any(handler))
        .with_state(load_balancer);
    // Lắng nghe trên cổng đã cấu hình
    let addr = format!("0.0.0.0:{}", config.port)
        .parse::<SocketAddr>()
        .unwrap();
    println!("Load balancer running on {}", addr);

    axum::Server::bind(&addr)
        .serve(app.into_make_service())
        .await
        .unwrap();
}
