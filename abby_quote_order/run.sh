#!/bin/bash

source config.sh

echo "
===============================================================================THIS SCRIPT UPDATES $ABBYQUOTEORDER
THE DATE IS $DATE
===============================================================================
GOOGLE SHEET STUFF:

JS config file 		=	$CNFIG
Sheet Id		=	$SHEETID
Probabilities entry	=	$PROBSENTRY

===============================================================================
JSON FILES STUFF

all keyqwords json 	=	$JSONKEYWORDARRAYS
probs in json format	=	$JSONPROBS

===============================================================================
PROBABILITIES FILES

File keeping probs 	=	$PROBSFILE

===============================================================================
PD STUFF (FOR PREVIOUS TESTS)

Array name prefix	=	$ARRPREFIX
Array directory		=	$ARRDIR
Total filled probs 	=	$COUNT

===============================================================================
USING UNIX SORT

Sorted Probs 		=	$SORTEDPROBS
Sorted Ids		=	$SORTEDID
===============================================================================
FOR SOURCING CONFIG.SH

Configuration Flag	=	$CONFIG
===============================================================================
"
source get_keyword_arrays.sh
source parse_keyword_arrays.sh
source convert_to_pd_arrays.sh
echo $COUNT > array_count.txt
#1 to make it reverse sort
if [[ $1 ]]
then
	source sort_em_all.sh 1
else
	source sort_em_all.sh
fi
source abby_quote_order.sh
source clean_all.sh
exit 0
