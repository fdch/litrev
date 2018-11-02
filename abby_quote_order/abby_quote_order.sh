#!/bin/bash
#==============================================================================
#
#	THIS FILE GENERATES $ABBYQUOTEORDER 
#	INTO abby_quote_order.js FILE
#
#==============================================================================

#	SOURCE CONFIG FILE
if [ -z $CONFIG ]; then source config.sh ; fi

echo "abby_quote_order.sh"

#	FORMAT $SORTEDID INTO JAVASCRIPT STRING ARRAY
i=0
while read line ; do
	LINES[$i]="\"$line\", "
	i=$(($i + 1))
done < $SORTEDID

#	A JS BLOCK COMENT
BLOCKCOMMENT="
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////"
#	A THREE-LINE JS COMMENT
COMMENTTHREE="
//
//
//"
#	MAKE THE FILE
echo "$BLOCKCOMMENT$COMMENTTHREE
//	Automatically generated from 'abby_quote_order.sh'
//	on $DATE $COMMENTTHREE
quoteOrder=[${LINES[*]}];$COMMENTTHREE
quoteOrLen=$i;$COMMENTTHREE
//	End of abby_quote_order$COMMENTTHREE$BLOCKCOMMENT
" > $ABBYQUOTEORDER
#==============================================================================
#
#	END JS FILE GENERATION
#
#==============================================================================
