import express from 'express';
const router = express.Router();
import knex from 'knex';
import knexConfig from '../knexfile.js';

const db = knex(knexConfig);

router.use((req, res, next) => {
    console.log(`Request received: ${req.method} ${req.url}`);
    next();
});

router.get('/', async (req, res) => {
    const sheets = await db('sheets').select('*');
    res.json(sheets);
});

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const sheet = await db('sheets').where('id', id).first();
    if (sheet) {
        res.json(sheet);
    } else {
        res.status(404).send('Sheet not found');
    }
});

router.post('/', async (req, res) => {
    const newSheet = await db('sheets').insert(req.body).returning('*');
    res.status(201).json(newSheet);
});

export default router;
