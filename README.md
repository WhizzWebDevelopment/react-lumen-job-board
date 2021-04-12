# React + Lumen Job Board

A full-stack job board application built with **React 17** (functional hooks) and **Laravel Lumen 8** REST API.

## Tech Stack

| Layer | Technology | Version |
|-------|-----------|---------|
| Frontend | React | 17.x |
| Routing | React Router | 5.x |
| UI | Semantic UI React | 2.x |
| Backend | Laravel Lumen | 8.x |
| Database | MySQL | 5.7 |
| Container | Docker + docker-compose | |

## Features

- Job listing board with CRUD operations
- Create, view, and delete job postings
- Responsive UI with Semantic UI components
- Functional components with React Hooks
- Dockerised full-stack development environment
- CORS-enabled API

## Quick Start

### With Docker

```bash
docker-compose build
docker-compose up
docker-compose exec backend php artisan migrate
```

- Frontend: http://localhost:3000
- Backend API: http://localhost:8000

### Without Docker

**Backend:**
```bash
cd backend
cp .env.example .env
# Configure DB credentials in .env
composer install
php artisan migrate
php artisan serve
```

**Frontend:**
```bash
cd frontend
cp .env.example .env
npm install
npm start
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/jobs` | List all jobs |
| POST | `/api/jobs` | Create a job |
| GET | `/api/jobs/{id}` | Get job by ID |
| PUT | `/api/jobs/{id}` | Update job |
| DELETE | `/api/jobs/{id}` | Delete job |

## Database

Table: `jobs`

| Column | Type |
|--------|------|
| id | int (auto) |
| title | string |
| description | string |
| location | string |
| created_at / updated_at | timestamps |
