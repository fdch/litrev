#!/bin/bash
#==============================================================================
#
#	THIS FILE FILTERS $JSONKEYWORDARRAYS 
#	INTO $JSONPROBS BY $PROBSENTRY
#
#	IT REQUIRES `jq` AT LEAST VERSION jq-1.5
#	AVAILABLE HERE: https://stedolan.github.io/jq
#
#==============================================================================

#	SOURCE CONFIG FILE
if [ -z $CONFIG ]; then source config.sh ; fi

#	ADDRESS FOR THE LOCATION OF OUR $POBSENTRY WITHIN
#	THE DOWNLOADED GOOGLE SHEET JSON OBJECT
tn=".feed.entry[].$PROBSENTRY.\"\$t\""

echo "parse_keyword_arrays.sh"

#	RUN THE FILTER
jq --arg tn "$tn" "$tn" "$JSONKEYWORDARRAYS" > $JSONPROBS

#	REMOVE QUOTES FROM JSON OBJECT CAUSE WE DON'T NEED THEM
sed 's/"//g;' $JSONPROBS > $PROBSFILE

#==============================================================================
#
#	END FILTER PROGRAM
#
#==============================================================================
