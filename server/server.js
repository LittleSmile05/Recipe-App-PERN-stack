const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

app.use(bodyParser.json());

app.post('/api/likedRecipes', async (req, res) => {
    const { recipeName } = req.body;
    try {
        const client = await pool.connect();
        const result = await client.query('INSERT INTO liked_recipes (name) VALUES ($1) RETURNING *', [recipeName]);
        client.release();
        res.json(result.rows[0]);
    } catch (err) {
        console.error('Error saving liked recipe:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
