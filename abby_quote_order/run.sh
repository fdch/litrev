#!/bin/bash
#=============================================================================
#
#
#		THIS SCRIPT UPDATES $ABBYQUOTEORDER
#
#
#==============================================================================

#	SOURCE MAIN CONFIGURATION FILE
source config.sh

#	OUTPUT A BIG MESSAGE TO SCREEN
bigMessage

#
#	BEGIN SOURCING
#
stitle "sourcing..."
source get_keyword_arrays.sh
source parse_keyword_arrays.sh
#	source convert_to_pd_arrays.sh

#	1 TO MAKE IT REVERSE SORT
if [[ $1 ]] ; then
	source sort_em_all.sh 1
else
	source sort_em_all.sh
fi
source abby_quote_order.sh
source clean_all.sh 1
stitle "Exiting."
#
#	END SOURCING AND EXIT
#
exit 0
