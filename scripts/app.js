const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost', user: 'root', password: 'senha1', database: 'catalogo_insumos'
});

// Cadastrar
app.post('/insumos', (req, res) => {
    db.query('INSERT INTO insumos SET ?', req.body, () => res.send('Salvo!'));
});

// Listar
app.get('/insumos', (req, res) => {
    db.query('SELECT * FROM insumos', (err, results) => res.json(results));
});

// Editar
app.put('/insumos/:id', (req, res) => {
    db.query('UPDATE insumos SET ? WHERE id=?', [req.body, req.params.id], () => res.send('Atualizado!'));
});

// Excluir
app.delete('/insumos/:id', (req, res) => {
    db.query('DELETE FROM insumos WHERE id=?', [req.params.id], () => res.send('Excluído!'));
});

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));