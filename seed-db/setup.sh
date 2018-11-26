#!/bin/bash

set -e

mongoimport -d hotel -c rooms --file rooms.json --jsonArray
mongoimport -d hotel -c reservations --file reservations.json --jsonArray
