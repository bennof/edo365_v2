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
KillMode=mixed
TimeoutStopSec=5
PrivateTmp=true
WorkingDirectory=$(pwd)
ExecStart=/usr/local/bin/pipenv run gunicorn  --workers 4 -b 127.0.0.1:8080 edo365.wsgi:application
ExecReload=/bin/kill -s HUP $MAINPID


[Install]
WantedBy=multi-user.target

EOF