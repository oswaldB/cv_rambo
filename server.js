const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Configuration
const OLLAMA_API_KEY = process.env.OLLAMA_API_KEY || '0011dea90cd149cc91c8e7828e35d187.lwnvxLJf3lt4Cv6n_y5teZ_C';
const OLLAMA_ENDPOINT = 'https://ollama.com/api/chat';

// Proxy route for Ollama API
app.post('/api/chat', async (req, res) => {
    try {
        const response = await fetch(OLLAMA_ENDPOINT, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${OLLAMA_API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(req.body)
        });

        const data = await response.json();
        res.status(response.status).json(data);
    } catch (error) {
        console.error('Proxy error:', error);
        res.status(500).json({ error: error.message });
    }
});

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📁 Open http://localhost:${PORT} to access the chat`);
});
