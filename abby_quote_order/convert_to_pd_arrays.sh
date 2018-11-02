#!/bin/bash
#==============================================================================
#
#	THIS FILE MAKES AN ARRAY DIRECTORY
#	AND PUTS THERE ALL LINES INTO SEPARATE FILES
#	FORMATTED AS PUREDATA ARRAYS
#
#==============================================================================

#	SOURCE CONFIG FILE
if [ -z $CONFIG ]; then source config.sh ; fi

#	HANDLE THE ARRAY DIRECTORY
if [ ! -d $ARRDIR ]; then
	#	MAKE ARRAY DIR IF ITS NOT THERE
	mkdir $ARRDIR 
else
	#	DELETE ITS CONTENTS
	rm $ARRDIR/*
fi

echo "convert_to_pd_arrays.sh"

#	MAKE EACH LINE INTO A SEPARATE FILE
while read line; do
	echo $line > $ARRDIR/$ARRPREFIX-$COUNT.txt
	((COUNT++))
done < $PROBSFILE

#	CHANGE DIR TO $ARRDIR
cd $ARRDIR

#	MAKE EACH LINE INTO A PD ARRAY
for i in *
do
	cat $i | tr " " "\n" > $i-temp
	rm $i
	mv $i-temp $i
done

#	CHANGE DIR BACK
cd ..

#==============================================================================
#
#	END PUREDATA ARRAYS
#
#==============================================================================
