/**
 * Backend Proxy Ollama
 * Description: Proxy API vers Ollama Cloud pour éviter les CORS
 */

const http = require('http');
const https = require('https');
const url = require('url');

const PORT = process.env.PORT || 3000;
const OLLAMA_HOST = process.env.OLLAMA_HOST || 'http://localhost:11434';

const server = http.createServer(async (req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    res.writeHead(200);
    res.end();
    return;
  }
  
  // Health check
  if (req.url === '/health') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ status: 'ok', timestamp: new Date().toISOString() }));
    return;
  }
  
  // Proxy to Ollama
  if (req.url.startsWith('/api/')) {
    try {
      const targetUrl = `${OLLAMA_HOST}${req.url}`;
      console.log(`[PROXY] ${req.method} ${targetUrl}`);
      
      const options = {
        method: req.method,
        headers: {
          'Content-Type': 'application/json'
        }
      };
      
      const proxyReq = http.request(targetUrl, options, (proxyRes) => {
        res.writeHead(proxyRes.statusCode, { 'Content-Type': 'application/json' });
        proxyRes.pipe(res);
      });
      
      proxyReq.on('error', (err) => {
        console.error('[PROXY ERROR]', err.message);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Ollama unreachable', message: err.message }));
      });
      
      if (req.method === 'POST') {
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
          proxyReq.write(body);
          proxyReq.end();
        });
      } else {
        proxyReq.end();
      }
      
    } catch (error) {
      console.error('[ERROR]', error);
      res.writeHead(500);
      res.end(JSON.stringify({ error: error.message }));
    }
    return;
  }
  
  // Default 404
  res.writeHead(404);
  res.end(JSON.stringify({ error: 'Not found' }));
});

server.listen(PORT, () => {
  console.log('[CHECKPOINT]', 'server-started', { port: PORT });
  console.log('[CHECKPOINT]', 'proxy-ready', { target: OLLAMA_HOST });
  console.log(`[PROXY] Server running on port ${PORT}`);
  console.log(`[PROXY] Forwarding to ${OLLAMA_HOST}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('[CHECKPOINT]', 'server-stopping');
  server.close(() => {
    console.log('[CHECKPOINT]', 'server-stopped');
    process.exit(0);
  });
});

module.exports = { server };
