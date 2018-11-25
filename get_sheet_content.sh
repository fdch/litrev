#!/bin/bash

CNFIG=js/configuration.js

https=`grep "var https" "$CNFIG" | 
cut -d= -f2 | cut -d";" -f1 |
sed 's/"//g;s/ //g'`

ssID=`grep "var ssID" "$CNFIG" | 
cut -d= -f2 | cut -d";" -f1 |
sed 's/"//g;s/ //g'`

altjson=`grep "var altjson" "$CNFIG" | 
cut -d= -f2 | cut -d";" -f1 |
sed 's/"//g;s/ //g'`

for i in {0..4} ; do
	sheetnum=$((i+1))
	SHEETS[i]="$https$ssID$sheetnum$altjson=json"
done;

SHCOUNT=1
for i in ${SHEETS[*]}
do
	curl "$i" -o "_private_sheet_content/_sheet-$SHCOUNT.json"
	((SHCOUNT++))
done

exit 0
