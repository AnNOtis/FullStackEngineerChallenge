#!/bin/sh

cd server && ./bin/rails server &
cd client && yarn start
