import collections
import re
import pickle

mytext='_private_sheet_content/_all_quotes.txt'
mydict='_private_sheet_content/_all_quotes_dictionary.pkl'

#==============================================================================
#
#	OPEN DICTIONARY FILE AND LOAD ITS KEYS AND VALUES IN MEMORY
#
#==============================================================================

w=open(mydict,'rb')	#	Open dictionary file
cnt=pickle.load(w)	#	Make it readable

dwords=[]	#	Store all dictionary keys
dfreqs=[]	#	Store all dictionary values (word frequency)

for count, (key, value) in enumerate(cnt.iteritems(), 1):
    dwords.append(key)
    dfreqs.append(value)

# print dwords.index("'where'")

w.close()	#	Close dictionary file

# quit()

#==============================================================================
#
#	OPEN TEXT FILE AND LOAD ITS LINES IN MEMORY
#
#==============================================================================

f=open(mytext,'r')	#	Open quotes text file

lines=[]	#	Array to store all text lines

for i in f:	#	Add lines to the lines array
	lines.append(i)

# print lines[1]

f.close()	#	Close quotes text file

# quit()

#==============================================================================
#
#	STRIP LINES FROM UNWANTED CHARACTERS
#
#==============================================================================

slines={}	#	object to store all stripped lines
count=0		#	var to update keys
	
for i in lines:	#	all lines in array
	i=i.lower()
	lc=re.findall(r'\b[^\W\d_]+[\w-]+\b', i)	#	Strip odd chars from line
	slines.update({count:lc})					#	update slines object
	count+=1									#	increment count

# print slines[1]

# quit()

#==============================================================================
#
#	MAKE AN IDENTICAL SLINES OBJECT USING DICTIONARY INDEX VALUES:
#	USE ALL WORDS IN STRIPPED LINES ARRAY TO LOOKUP THEIR INDEX IN DICTIONARY
#
#==============================================================================

ilines={}	#	an object to store index values
count=0		#	var to increment object keys
for i in slines:	#	all keys in slines
	wi=[]		#	array to store all word indices
	for j in slines[i]:		#	all words in each sline array
		ind=dwords.index(j)	#	find index in dictionray
		wi.append(ind)			#	append index to word index array
	ilines.update({count:wi})
	count+=1			#	increment count


# print ilines[1]

# quit()

#==============================================================================
#
#	DUMP ILINES AND SLINES ARRAY INTO NEW DATA FILES
#
#==============================================================================

f=open("_private_sheet_content/_all_quotes_word_indices.pkl","wb")
g=open("_private_sheet_content/_all_quotes_word_values.pkl","wb")
pickle.dump(ilines, f)
pickle.dump(slines, g)
f.close()
g.close()
quit()
