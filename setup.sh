#!/bin/sh

cd server && bundle && rake db:setup &
cd client && yarn install
