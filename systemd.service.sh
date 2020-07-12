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
ExecStart=/usr/local/bin/pipenv run gunicorn --access-logfile $(pwd)/gunicorn.log --workers 4 -b unix:$(pwd)/edo365/edo365.sock  edo365.wsgi:application
ExecReload=/bin/kill -s HUP \$MAINPID


[Install]
WantedBy=multi-user.target

EOF