# Base image for building the frontend (React app)
FROM node:16-slim AS build

# Set the working directory for the build
WORKDIR /app/frontend

# Copy the frontend package.json and install Node.js dependencies (including Tailwind)
COPY ./frontend/package.json ./frontend/package-lock.json ./
RUN npm install

# Copy the rest of the frontend code and build the React app
COPY ./frontend ./
RUN npm run build

# Final stage: build the final image for serving both backend and frontend
FROM python:3.10-slim

# Set the working directory to /app
WORKDIR /app

# Install supervisor
RUN apt-get update && apt-get install -y supervisor

# Copy backend files (telemetry and database) from local source
COPY ./telemetry ./telemetry
COPY ./database ./database

# Copy the frontend build files from the build stage
COPY --from=build /app/frontend/build /app/frontend/build
COPY --from=build /app/frontend/server.py /app/frontend/server.py

# Copy the requirements.txt and install Python dependencies in the final image
COPY ./requirements.txt .
RUN python3 -m pip install --no-cache-dir -r requirements.txt

# Supervisor configuration
COPY ./supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# Expose the ports for backend and frontend servers
EXPOSE 5000 5000/udp

# Start Supervisor to manage both processes
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisor/conf.d/supervisord.conf"]
