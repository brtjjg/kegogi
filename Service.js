require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// Serve static files from the "public" folder
app.use(express.static('public'));

// Health check endpoint (optional)
app.get('/api/status', (req, res) => {
  res.json({ status: 'OK', message: 'Kegogi Medicare backend is running' });
});

// For any other route, serve the HTML file (SPA support)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
