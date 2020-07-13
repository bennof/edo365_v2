#!/bin/sh

sudo systemctl stop edo365
sudo git reset --hard
sudo git pull https://github.com/bennof/edo365_v2
sudo make
sudo make install
sudo systemctl start edo365
