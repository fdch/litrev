#!/bin/bash
#==============================================================================
#
#	THIS FILE CLEANS ALL VARIABLES AND FILES
#
#==============================================================================

#	SOURCE CONFIG FILE
if [ -z $CONFIG ]; then source config.sh ; fi

#	REMOVE EXTRA FILES
if [[ $1 ]]; then
	echo "clean_all.sh 1"
	rm $JSONPROBS
	rm $JSONKEYWORDARRAYS
	rm $PROBSFILE
	rm $SORTEDPROBS
	rm $SORTEDID
else
	echo "clean_all.sh"
fi

#	UNSET ALL VARIABLES
unset ABBYQUOTEORDER
unset CNFIG
unset https
unset ssID
unset altjson
unset SHEETID
unset PROBSENTRY
unset JSON
unset PROBS
unset JSONKEYWORDARRAYS
unset PROBSFILE
unset ARRPREFIX
unset ARRDIR
unset COUNT
unset DATE
unset SORTEDPROBS
unset SORTEDID
unset CONFIG

#==============================================================================
#
#	END CLEAN ALL
#
#==============================================================================
