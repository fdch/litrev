#!/bin/bash

if [ -z $CONFIG ]
then
	source config.sh
fi

curl $SHEETID -o $JSONKEYWORDARRAYS
