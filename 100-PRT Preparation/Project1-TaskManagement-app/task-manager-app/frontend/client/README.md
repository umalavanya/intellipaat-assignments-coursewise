# Task Manager

A full-stack task management application built with React, Redux Toolkit, Express, MongoDB, and JWT authentication. Users can create an account, sign in securely, and manage their own tasks from a focused dashboard.

## Features

- User registration and login
- Password hashing with `bcryptjs`
- JWT-based authentication for protected task routes
- Create, view, update, and delete tasks
- Mark tasks as pending or completed
- User-specific task lists
- Responsive React interface
- API and frontend error handling

## Technology Stack

| Area | Technology |
| --- | --- |
| Frontend | React 19, Vite, React Router, Redux Toolkit |
| HTTP client | Axios |
| UI icons | Lucide React |
| Backend | Node.js, Express 5 |
| Database | MongoDB with Mongoose |
| Authentication | JSON Web Tokens |
| Security | bcryptjs, CORS |

## Project Structure

```text
task-manager-app/
├── backend/
│   ├── config/db.js
│   ├── controllers/
│   ├── middleware/auth.js
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
└── frontend/client/
    ├── src/components/
    ├── src/store/
    ├── src/App.jsx
    └── package.json
```

## Prerequisites

- Node.js 18 or later
- npm
- A running MongoDB instance or MongoDB Atlas connection

## Configuration

Create `backend/.env` with the following values:

```env
MONGO_URI=mongodb://127.0.0.1:27017/task-manager
JWT_SECRET=replace-with-a-long-random-secret
PORT=5000
```

Keep `.env` out of source control. The frontend currently calls the API at `http://localhost:5000`.

## Installation

From the `task-manager-app` directory, install dependencies in both applications:

```bash
cd backend
npm install

cd ../frontend/client
npm install
```

## Running the Application

Start the backend in one terminal:

```bash
cd task-manager-app/backend
npm run dev
```

Start the frontend in a second terminal:

```bash
cd task-manager-app/frontend/client
npm run dev
```

Open the URL printed by Vite, normally `http://localhost:5173`.

For a production-style frontend build:

```bash
cd task-manager-app/frontend/client
npm run build
npm run preview
```

## API Reference

The backend runs on port `5000` by default.

| Method | Endpoint | Authentication | Description |
| --- | --- | --- | --- |
| `GET` | `/api/test` | None | Check that the API is running |
| `POST` | `/api/auth/register` | None | Register a user |
| `POST` | `/api/auth/login` | None | Authenticate a user |
| `GET` | `/api/tasks` | Bearer token | Return the signed-in user's tasks |
| `POST` | `/api/tasks` | Bearer token | Create a task |
| `PUT` | `/api/tasks/:id` | Bearer token | Update a task |
| `DELETE` | `/api/tasks/:id` | Bearer token | Delete a task |

Protected requests must include:

```http
Authorization: Bearer <jwt-token>
```

## Available Scripts

### Backend

- `npm start` starts the API with Node.js.
- `npm run dev` starts the API with Nodemon.

### Frontend

- `npm run dev` starts the Vite development server.
- `npm run build` creates a production build.
- `npm run preview` serves the production build locally.
- `npm run lint` runs Oxlint.

## Troubleshooting

### The API does not start

Confirm MongoDB is running and that `backend/.env` contains a valid `MONGO_URI` and `JWT_SECRET`.

### Requests return `Not authorized`

Sign in again to refresh the JWT stored in browser local storage, then retry the request.

### A task is not created

Check that both the backend and frontend are running, the user is authenticated, and the browser is sending the Bearer token. The task form displays API errors without closing when a request fails.

## Development Notes

- Task ownership is enforced by the backend using the authenticated user's ID.
- Passwords are hashed before users are saved.
- Task status values are `pending` and `completed`.
- The frontend and backend are intentionally run as separate applications during development.

## Future Improvements

The following improvements are planned to make the application more robust, scalable, and useful in production:

### User Experience

- Add task due dates, priorities, categories, and tags.
- Support search, filtering, sorting, and pagination for larger task lists.
- Add confirmation dialogs and toast notifications for task actions.
- Improve accessibility with keyboard navigation, focus management, and semantic feedback.
- Add a user profile page with account and password management.

### Backend and Security

- Move the frontend API URL into a Vite environment variable instead of hard-coding it.
- Add request validation and sanitization with a schema validation library.
- Add rate limiting, security headers, and stricter CORS configuration.
- Use secure, HTTP-only cookies for authentication where appropriate.
- Add refresh-token rotation, token expiration handling, and logout invalidation.
- Introduce structured logging and centralized error handling.

### Testing and Quality

- Add unit tests for controllers, middleware, Redux slices, and reusable components.
- Add integration tests for authentication and task ownership rules.
- Add end-to-end tests for registration, login, and task management workflows.
- Add automated linting, testing, and build checks through CI/CD.
- Add TypeScript and shared request/response types as the project grows.

### Deployment and Operations

- Add production deployment configuration for the frontend, API, and MongoDB.
- Separate development, staging, and production environment settings.
- Add health checks, monitoring, and error tracking.
- Configure automated database backups and documented recovery procedures.
- Add API documentation using OpenAPI or Swagger.
