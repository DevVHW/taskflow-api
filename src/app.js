const express = require('express');

const app = express();
app.use(express.json());

let tasks = [];
let nextId = 1;

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.get('/tasks', (req, res) => {
  res.status(200).json(tasks);
});

app.post('/tasks', (req, res) => {
  const { title } = req.body;
  if (!title || typeof title !== 'string') {
    return res.status(400).json({ error: 'O campo "title" é obrigatório.' });
  }
  const task = { id: nextId++, title, done: false };
  tasks.push(task);
  res.status(201).json(task);
});

app.patch('/tasks/:id/done', (req, res) => {
  const task = tasks.find((t) => t.id === Number(req.params.id));
  if (!task) {
    return res.status(404).json({ error: 'Tarefa não encontrada.' });
  }
  task.done = true;
  res.status(200).json(task);
});

app.delete('/tasks/:id', (req, res) => {
  const before = tasks.length;
  tasks = tasks.filter((t) => t.id !== Number(req.params.id));
  if (tasks.length === before) {
    return res.status(404).json({ error: 'Tarefa não encontrada.' });
  }
  res.status(204).send();
});

module.exports = app;
