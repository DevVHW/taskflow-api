const request = require('supertest');
const app = require('../src/app');

describe('TaskFlow API', () => {
  test('GET /health retorna status ok', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ status: 'ok' });
  });

  test('POST /tasks cria uma nova tarefa', async () => {
    const res = await request(app).post('/tasks').send({ title: 'Estudar GCS' });
    expect(res.statusCode).toBe(201);
    expect(res.body.title).toBe('Estudar GCS');
    expect(res.body.done).toBe(false);
  });

  test('POST /tasks sem title retorna 400', async () => {
    const res = await request(app).post('/tasks').send({});
    expect(res.statusCode).toBe(400);
  });

  test('GET /tasks retorna lista de tarefas', async () => {
    const res = await request(app).get('/tasks');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
