console.log("Hello from API Gateway");
Bun.serve({
    port: 3000,
    fetch(req) {
        return new Response("Hello, Bun!");
    },
});