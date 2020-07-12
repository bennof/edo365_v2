#!/bin/sh

cat > $1 <<EOF
[Unit]
Description=edo365 Django Gunicorn webserver.
After=network.target
StartLimitIntervalSec=0

[Service]
User=$2
Group=$3
Type=simple
Restart=always
RestartSec=1
WorkingDirectory=$(pwd)
ExecStart=/usr/local/bin/pipenv run gunicorn --access-logfile --workers 4 -b 127.0.0.1:8080 edo365.wsgi:application


[Install]
WantedBy=multi-user.target

EOF