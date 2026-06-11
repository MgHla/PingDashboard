const fs = require('fs');
const { exec } = require('child_process');
const WebSocket = require('ws');
const http = require('http');

const PORT = 3000;
const CSV_FILE = 'pinginfo.csv';

// Helper to parse CSV simply
function parseCSV() {
    const data = fs.readFileSync(CSV_FILE, 'utf8');
    const lines = data.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    const headers = lines[0].split(',').map(h => h.trim());
    
    return lines.slice(1).map(line => {
        const values = line.split(',').map(v => v.trim());
        let obj = {};
        headers.forEach((header, index) => {
            obj[header] = values[index];
        });
        return obj;
    });
}

// Minimal Server Setup
const server = http.createServer((req, res) => {
    if (req.url === '/' || req.url === '/index.html') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(fs.readFileSync('index.html'));
    } else {
        res.writeHead(404);
        res.end();
    }
});

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
    console.log('Dashboard Client Connected.');
    const hosts = parseCSV();
    
    // Send initial configuration to client to build UI
    ws.send(JSON.stringify({ type: 'init', hosts }));

    // Start a 2-second ping loop for each host
    const intervals = hosts.map(host => {
        // Detect OS for proper ping command flags
        const isWin = process.platform === 'win32';
        const cmd = isWin ? `ping -n 1 ${host.IPaddress}` : `ping -c 1 ${host.IPaddress}`;

        const runPing = () => {
            exec(cmd, (error, stdout, stderr) => {
                let outputLine = '';
                if (error) {
                    outputLine = `Request timed out for ${host.IPaddress}`;
                } else {
                    // Extract the relevant line from CLI stdout
                    const lines = stdout.split('\n').map(l => l.trim()).filter(l => l.length > 0);
                    // Usually the 2nd line contains the response metric
                    outputLine = lines[1] || lines[0];
                }

                if (ws.readyState === WebSocket.OPEN) {
                    ws.send(JSON.stringify({
                        type: 'ping',
                        ip: host.IPaddress,
                        line: outputLine
                    }));
                }
            });
        };

        runPing(); // Initial execution
        return setInterval(runPing, 2000); // Repeat every 2 seconds
    });

    ws.on('close', () => {
        console.log('Dashboard Client Disconnected.');
        intervals.forEach(clearInterval);
    });
});

server.listen(PORT, () => {
    console.log(`🚀 Dashboard available at http://localhost:${PORT}`);
});