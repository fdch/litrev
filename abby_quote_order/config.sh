#!/bin/bash
#==============================================================================
#
#	VARIABLES CONFIGURATION
#
#==============================================================================

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
ARRAYCOUNTFILE=array_count.txt

DATE=`date`

SORTEDPROBS=sorted_probs
SORTEDID=sorted_id

function title() {
	local strone=$1
	local strtwo=$2
	echo "
===============================================================================

$strone

$strtwo

===============================================================================
"
}
function stitle() {
	local strone=$1
	local strtwo=$2
	echo "
-------------------------------------------------------------------------------
$strone	$strtwo
-------------------------------------------------------------------------------
"	
}
function varpair() {
	local strone=$1
	local strtwo=$2
	echo "$strone	= $strtwo"
	echo
}

function bigMessage() {
	title "THIS SCRIPT UPDATES $ABBYQUOTEORDER" "THE DATE IS $DATE"
	stitle "GOOGLE SHEET STUFF"
	varpair "JS config file" "$CNFIG"
	varpair "Sheet Id"	"$SHEETID"
	varpair "Probabilities entry" "$PROBSENTRY"
	stitle "JSON FILES STUFF"
	varpair "all keyqwords json" "$JSONKEYWORDARRAYS"
	varpair "probs in json format" "$JSONPROBS"
	stitle "PROBABILITIES FILES"
	varpair "File keeping probs" "$PROBSFILE"
	stitle "PD STUFF" "(FOR PREVIOUS TESTS)"
	varpair "Array name prefix" "$ARRPREFIX"
	varpair "Array directory" "$ARRDIR"
	varpair "Total filled probs" "$COUNT"
	varpair "Array count file" "$ARRAYCOUNTFILE"
	stitle "USING UNIX SORT" "(CURRENT CONFIGURATION)"
	varpair "Sorted Probs" "$SORTEDPROBS"
	varpair "Sorted Ids" "$SORTEDID"
	stitle "FOR SOURCING CONFIG.SH"
	varpair "Configuration Flag" "$CONFIG"
}

CONFIG=1

#==============================================================================
#
#	END CONFIGURATION
#
#==============================================================================
