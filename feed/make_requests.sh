#!/bin/bash
for i in {1..5}
do 
  sleep 1
	curl --request GET localhost:3000/feed/stan
done
