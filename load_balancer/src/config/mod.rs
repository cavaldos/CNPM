use dotenv::dotenv;
use std::collections::HashMap;
use std::env;

pub struct Config {
    pub port: String,
    pub debug_mode: bool,
    pub servers: Vec<String>,
}

impl Config {
    pub fn new() -> Self {
        // Tải các biến môi trường từ file .env
        dotenv().ok();

        // Lấy giá trị của biến môi trường hoặc sử dụng giá trị mặc định
        let port = env::var("PORT").unwrap_or_else(|_| "8080".to_string());
        let debug_mode = env::var("DEBUG_MODE").unwrap_or_else(|_| "false".to_string()) == "true";

        // Danh sách các máy chủ backend từ biến môi trường
        let mut servers = Vec::new();

        // Đọc tất cả biến môi trường
        let env_vars: HashMap<String, String> = env::vars().collect();

        // Tìm tất cả các biến có tiền tố SERVER_
        for (key, value) in env_vars.iter() {
            if key.starts_with("SERVER_") {
                servers.push(value.clone());
            }
        }

        // Nếu không tìm thấy server nào trong .env, sử dụng giá trị mặc định
        if servers.is_empty() {
            servers = vec![
                "http://localhost:5001".to_string(),
                "http://localhost:5002".to_string(),
            ];
        }

        // In thông tin cổng và danh sách server
        println!("Load balancer port: {} ", port);
        for (index, server) in servers.iter().enumerate() {
            println!("  {}: {}", index + 1, server);
        }

        if debug_mode {
            println!("Debug mode is enabled");
        }

        Self {
            port,
            debug_mode,
            servers,
        }
    }
}
