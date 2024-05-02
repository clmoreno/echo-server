const http = require("http");
const os = require("os");
const HOST = process.env.LISTEN_ADDR ?? '0.0.0.0';
const PORT = process.env.LISTEN_PORT ?? 8080;

function requestListener(req, res) {
    res.setHeader('Content-Type', 'application/json')
    res.writeHead(200);

    const network = Object.entries(os.networkInterfaces()).map(it => it[1]).flat()
        .filter(i => i.family === 'IPv4')
        .filter(i => i.internal === false)
        .shift();

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
            machine: os.machine(),
            network: network
        }
    };
    res.end(JSON.stringify(response));
}

const server = http.createServer(requestListener);
server.listen(PORT, HOST, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
});