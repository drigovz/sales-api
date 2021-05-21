#!/bin/sh

userLogged=$USER

if [ -d "/home/$USER/Dev/redisdb" ]
then
    echo "Directory /home/$userLogged/Dev/redisdb exists."
    sudo chown -R $userLogged /home/$userLogged/Dev/redisdb
else
    echo "Creating directory... "
    mkdir /home/$userLogged/Dev/redisdb
    sudo chown -R $userLogged /home/$userLogged/Dev/redisdb
fi
