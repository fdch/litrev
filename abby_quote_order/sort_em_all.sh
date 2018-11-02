#!/bin/bash
#==============================================================================
#
#	THIS FILE SORTS ALL PROBS INTO $SORTEDPROBS AND 
#	THEIR INDICES INTO $SORTEDID
#
#	IT NEEDS GNU `sort`
#
#==============================================================================

#	SOURCE CONFIG FILE
if [ -z $CONFIG ]; then source config.sh ; fi

if [ $1 ]; then
	DIRECTION="-r"
else
	DIRECTION=""
fi

echo "sort_em_all.sh $DIRECTION"

#	COUNT NUMBER OF FIELDS IN PROBSFILE
COLS=`head -n 1 $PROBSFILE | awk '{print NF}'`

#	PREPARE A NEW FILE FOR PROBS WITH AN ADDED ID AT THE END
#	WHICH IS NOT TAKEN INTO ACCOUNT IN THE SORTING
echo "" > probs_temp

i=0
while read line ; do
	echo "$line ID=$i" >> probs_temp
	((i++))

done < $PROBSFILE

#	REMOVE THE FIRST EMPTY LINE IN PROBS_TEMP
sed -ie '/^$/d' probs_temp

#	MAKE THE SORT FLAG THAT INCLUDES ALL FIELDS FOR SORTING
i=1
while [ "$i" -le "$COLS" ]; do
  SORTFLAG+=`echo " -k$i"`
  i=$(($i + 1))
done

#	DO THE SORTING INTO $SORTEDPROBS
sort $DIRECTION -n $SORTFLAG	probs_temp -o $SORTEDPROBS
	
#	EXTRACT IDS TO SORTEDID AND PROBS TO SORTEDPROBS 
cat $SORTEDPROBS | cut -d= -f2 > $SORTEDID
cat $SORTEDPROBS | cut -dI -f1 > $SORTEDPROBS-temp
mv $SORTEDPROBS-temp $SORTEDPROBS

#	GET RID OF TEMP FILE
rm probs_temp*

#	PUT ARRAY $COUNT IN $ARRAYCOUNTFILE
echo $COUNT > $ARRAYCOUNTFILE

#==============================================================================
#
#	END SORTING
#
#==============================================================================
