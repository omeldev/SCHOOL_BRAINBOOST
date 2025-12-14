# BrainBoost Application

This guide will help you set up and run the BrainBoost application on your computer using Docker. The application consists of three services: Backend (Spring Boot), Frontend (Angular), and PostgreSQL (database).

---

## Prerequisites

Ensure the following tools are installed on your computer:
1. **Docker**: [Install Docker](https://docs.docker.com/get-docker/)
2. **Docker Compose**: Comes pre-installed with Docker Desktop.

---

## Project Structure

The project is structured as follows:
```
BrainBoostBackend/
├── BrainBoostFrontend/
│   └── Dockerfile
├── docker-compose.yml
└── Dockerfile
```

---

## Steps to Start the Application

1. **Clone the Repository**  
   Clone the project repository to your local machine:
   ```bash
   git clone <repository-url>
   cd project-root
   ```

2. **Build the Docker Images**  
   Build the Docker images for all services:
   ```bash
   docker-compose build
   ```

3. **Start the Application**  
   Run the following command to start all services:
   ```bash
   docker-compose up
   ```

4. **Access the Application**  
   - **Frontend**: Open your browser and navigate to `http://localhost`
   - **Backend**: Accessible at `http://localhost:8080`
   - **PostgreSQL**: Database runs on `localhost:5432` (if needed)

---

## Troubleshooting

- If you encounter any issues, check the logs for each service:
  ```bash
  docker-compose logs <service-name>
  ```
  Replace `<service-name>` with `frontend`, `backend`, or `db`.

- Ensure ports `80`, `8080`, and `5432` are not in use by other applications.

---

## Stopping the Application

To stop the application, press `Ctrl+C` in the terminal where `docker-compose up` is running. Then, remove the containers:
```bash
docker-compose down
```

---
