const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'senha1',
    database: process.env.DB_NAME || 'catalogo_insumos',
    port: process.env.DB_PORT || 3306
});

app.post('/insumos', (req, res) => {
    db.query('INSERT INTO insumos SET ?', req.body, () => res.send('Salvo!'));
});

app.get('/insumos', (req, res) => {
    db.query('SELECT * FROM insumos', (err, results) => res.json(results));
});

app.put('/insumos/:id', (req, res) => {
    db.query('UPDATE insumos SET ? WHERE id=?', [req.body, req.params.id], () => res.send('Atualizado!'));
});

app.delete('/insumos/:id', (req, res) => {
    db.query('DELETE FROM insumos WHERE id=?', [req.params.id], () => res.send('Excluído!'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
