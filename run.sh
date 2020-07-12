#!/bin/sh

sudo git clone https://github.com/bennof/edo365_v2
cd edo365_v2
sudo make
sudo npm install --prefix ./edo365/js_src/ --unsafe-perm node-sass