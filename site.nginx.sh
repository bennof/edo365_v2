#!/bin/sh

cat > $1 <<EOF
upstream app_server {
    server 127.0.0.1:8080;
}

server {
    listen 80;
    server_name $2;

    client_max_body_size 4G;
    keepalive_timeout 5;

    location = /favicon.ico { access_log off; log_not_found off; }
    location /static/ {
        root $(pwd);
    }

    location / {
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;
        proxy_set_header Host \$http_host;
        proxy_set_header   X-Real-IP \$remote_addr;
        proxy_redirect off;
        proxy_pass http://app_server;

        # include         uwsgi_params;
        # uwsgi_pass      unix:$(pwd)/edo365/edo365.sock;
    }
}
EOF