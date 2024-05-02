const http = require("http");
const os = require("os");
const HOST = process.env.LISTEN_ADDR ?? '0.0.0.0';
const PORT = process.env.LISTEN_PORT ?? 8080;

function requestListener(req, res) {
    res.setHeader('Content-Type', 'application/json')
    res.writeHead(200);
    const response = {
        headers: req.headers,
        method: req.method,
        url: req.url,
        body: req.body,
        _meta: {
            hostname: os.hostname(),
            platform: os.platform(),
            release: os.release(),
            uptime: os.uptime(),
            memory: os.totalmem(),
            machine: os.machine()
        }
    };
    res.end(JSON.stringify(response));
}

const server = http.createServer(requestListener);
server.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
});