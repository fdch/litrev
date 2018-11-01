#!/bin/bash

ABBYQUOTEORDER=../js/abby_quote_order.js
CNFIG=../js/configuration.js

https=`grep "var https" "$CNFIG" | 
cut -d= -f2 | cut -d";" -f1 |
sed 's/"//g;s/ //g'`

ssID=`grep "var ssID" "$CNFIG" | 
cut -d= -f2 | cut -d";" -f1 |
sed 's/"//g;s/ //g'`

altjson=`grep "var altjson" "$CNFIG" | 
cut -d= -f2 | cut -d";" -f1 |
sed 's/"//g;s/ //g'`

SHEETID="$https$ssID"5"$altjson=json"
PROBSENTRY="\"gsx\$probs\""

JSONPROBS=probs.json
JSONKEYWORDARRAYS=keyword_arrays.json
PROBSFILE=probs

ARRPREFIX=arr
ARRDIR=arrs
COUNT=0

DATE=`date`

SORTEDPROBS=sorted_probs
SORTEDID=sorted_id

CONFIG=1