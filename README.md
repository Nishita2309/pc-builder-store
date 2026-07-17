# Gearbox PC — PC Builder Store

Full-stack e-commerce application for browsing PC components, building custom rigs, and managing orders. The frontend is a React + Vite app; the backend is a Spring Boot REST API with JWT authentication and an in-memory H2 database.

## Tech Stack

| Layer    | Technology                          |
| -------- | ----------------------------------- |
| Frontend | React 19, Vite, Tailwind CSS      |
| Backend  | Spring Boot 3.5, Spring Security    |
| Database | H2 (in-memory, seeded on startup)   |
| Auth     | JWT                                 |

## Prerequisites

- **Java 17+** ([Eclipse Temurin](https://adoptium.net/) recommended)
- **Node.js 18+** and **npm**

Maven is bundled via the Maven Wrapper (`mvnw` / `mvnw.cmd`) — no separate Maven install required.

## Project Structure

```
pc-builder-store-main/
├── backend/          # Spring Boot API (port 8080)
└── frontend/         # React app (port 5173)
```

## Getting Started

Run the **backend** and **frontend** in separate terminals. Start the backend first.

### 1. Start the Backend

**Windows (PowerShell / CMD):**

```bash
cd backend
.\mvnw.cmd spring-boot:run
```

**macOS / Linux:**

```bash
cd backend
./mvnw spring-boot:run
```

The API starts at **http://localhost:8080**.

Useful backend URLs:

- Swagger UI: http://localhost:8080/swagger-ui.html
- Health check: http://localhost:8080/actuator/health
- H2 console: http://localhost:8080/h2-console

### 2. Start the Frontend

In a **second terminal**:

```bash
cd frontend
npm install
npm run dev
```

The app opens at **http://localhost:5173**.

The Vite dev server proxies `/api` requests to the backend at `http://localhost:8080`, so no extra CORS setup is needed during development.

## Demo Accounts

| Role     | Email                    | Password      |
| -------- | ------------------------ | ------------- |
| Admin    | `admin@pcbuilder.com`    | `admin123`    |
| Customer | `customer@pcbuilder.com` | `customer123` |

Log in as admin to access the admin dashboard at `/admin`.

## Build for Production

**Frontend:**

```bash
cd frontend
npm run build
npm run preview
```

**Backend:**

```bash
cd backend
.\mvnw.cmd clean package    # Windows
./mvnw clean package        # macOS / Linux

java -jar target/backend-0.0.1-SNAPSHOT.jar
```

## Stopping the Servers

Press **Ctrl+C** in each terminal where the backend or frontend is running.

## Troubleshooting

- **Backend fails with `release version 21 not supported`** — Install JDK 21, or ensure `java.version` in `backend/pom.xml` matches your installed JDK (currently set to `17`).
- **Frontend cannot reach the API** — Confirm the backend is running on port 8080 before starting the frontend.
- **Console shows `chrome-extension://` errors** — These come from browser extensions, not the app. Use an Incognito window or disable extensions on `localhost`.
