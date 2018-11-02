#!/bin/bash
#==============================================================================
#
#	THIS FILE GETS GOOGLE SHEET JSON OBJECT 
#	INTO $JSONKEYWORDARRAYS 
#
#	IT REQUIRES `curl`
#
#==============================================================================

#	SOURCE CONFIG FILE
if [ -z $CONFIG ]; then source config.sh ; fi

echo "get_keyword_arrays.sh"

#	FETCH JSON OBJECT 
curl $SHEETID -o $JSONKEYWORDARRAYS
