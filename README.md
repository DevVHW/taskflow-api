# TaskFlow API

API REST simples de gerenciamento de tarefas, desenvolvida como projeto de exemplo para a atividade
individual do Plano de Gerenciamento de Configuração (PGCS) — Enfoque DevOps.

## Stack

- Node.js + Express
- Jest + Supertest (testes)
- ESLint (lint)
- Docker
- GitHub Actions (CI/CD)

## Rodando localmente

```bash
npm install
npm start        # sobe em http://localhost:3000
npm test         # roda a suíte de testes com cobertura
npm run lint     # análise estática
```

## Rodando com Docker

```bash
docker build -t taskflow-api .
docker run -p 3000:3000 taskflow-api
```

## Endpoints

| Método | Rota              | Descrição                  |
|--------|-------------------|-----------------------------|
| GET    | /health           | Verificação de saúde        |
| GET    | /tasks            | Lista todas as tarefas      |
| POST   | /tasks            | Cria uma nova tarefa        |
| PATCH  | /tasks/:id/done   | Marca tarefa como concluída |
| DELETE | /tasks/:id        | Remove uma tarefa           |

## Pipeline CI/CD

- **CI** (`.github/workflows/ci.yml`): roda em todo Pull Request e push na `main` — lint, testes e build
  de validação da imagem Docker.
- **CD** (`.github/workflows/cd.yml`): roda após merge na `main` — publica a imagem versionada no
  GitHub Container Registry (GHCR) e promove o deploy por ambientes (staging → produção). Os passos de
  deploy estão simulados (`echo`), representando onde entraria a integração real com o provedor de
  nuvem/hospedagem escolhido.

Consulte o `PGCS.pdf` na raiz do repositório para o detalhamento completo do Plano de Gerenciamento de
Configuração deste projeto.
