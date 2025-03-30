use std::sync::atomic::{AtomicUsize, Ordering};

pub struct LoadBalancer {
    servers: Vec<String>,
    next_server: AtomicUsize,
    debug_mode: bool,
}

impl LoadBalancer {
    pub fn new(servers: Vec<String>, debug_mode: bool) -> Self {
        Self {
            servers,
            next_server: AtomicUsize::new(0),
            debug_mode,
        }
    }

    pub fn get_next_server(&self) -> String {
        let current = self.next_server.fetch_add(1, Ordering::SeqCst) % self.servers.len();
        let server = self.servers[current].clone();
        if self.debug_mode {
            println!("Selected server: {}", server);
        }
        server
    }

    pub fn is_debug_mode(&self) -> bool {
        self.debug_mode
    }
}
