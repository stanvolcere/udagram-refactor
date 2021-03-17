#!/bin/bash
for i in {1..10}
do 
  sleep 1
	curl --request GET localhost:3000/logs/stan
done
