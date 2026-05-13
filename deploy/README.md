# VPS Docker Deployment

This project is deployed by GitHub Actions through SSH to a VPS and then started with Docker Compose.

## Workflow Summary

1. GitHub Actions runs `npm ci` and `npm run build`
2. The workflow uploads `dist/` and the files in `deploy/` to the VPS
3. The VPS runs `docker compose up -d --build`
4. Nginx inside the container serves the static site

## VPS Requirements

- Docker installed
- Docker Compose available through `docker compose` or `docker-compose`
- `rsync` installed
- An SSH user that can write to the deployment directory
- That SSH user must also be able to run Docker without interactive `sudo`

Example:

```bash
sudo apt update
sudo apt install -y docker.io docker-compose-plugin rsync
sudo mkdir -p /var/www/personweb
sudo chown -R deploy:deploy /var/www/personweb
sudo usermod -aG docker deploy
```

## Required GitHub Secrets

- `VPS_HOST`: VPS public IP or domain
- `VPS_USER`: SSH username
- `VPS_SSH_KEY`: private key used by GitHub Actions
- `VPS_TARGET_DIR`: remote deployment directory, for example `/var/www/personweb`

## Optional GitHub Secrets

- `VPS_PORT`: SSH port, default `22`
- `VPS_KNOWN_HOSTS`: SSH host fingerprint, recommended
- `VPS_APP_PORT`: host port exposed by Docker, default `8080`
- `VPS_BIND_ADDRESS`: host bind address, default `0.0.0.0`
- `VPS_CONTAINER_NAME`: container name, default `personweb`
- `VPS_DOCKER_PROJECT_NAME`: Docker Compose project name, default `personweb`

## Reverse Proxy Example

If you prefer to keep the container on `127.0.0.1:8080` and let host Nginx expose the public domain:

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://127.0.0.1:8080;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

Then set:

- `VPS_BIND_ADDRESS=127.0.0.1`
- `VPS_APP_PORT=8080`

## Deployment Trigger

- Pull requests to `main`: build only
- Pushes to `main`: build and deploy
