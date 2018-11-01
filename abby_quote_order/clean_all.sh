#!/bin/bash

if [ -z $CONFIG ]
then
	source config.sh
fi

rm $JSONPROBS
rm $JSONKEYWORDARRAYS
rm $PROBSFILE
rm $SORTEDPROBS
rm $SORTEDID

unset CONFIG