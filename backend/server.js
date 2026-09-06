
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const masterController = require('../agents/master-controller');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
    res.send('JARVIS OS Backend is running.');
});

app.post('/api/chat', async (req, res) => {
    const { message, context } = req.body;
    try {
        const result = await masterController.process({ message, context });
        res.json(result);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
