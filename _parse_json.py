import json
from pprint import pprint
from HTMLParser import HTMLParser
import collections
import re
import pickle

allquotes='_private_sheet_content/_all_quotes.txt'

class MLStripper(HTMLParser):
    def __init__(self):
        self.reset()
        self.fed = []
    def handle_data(self, d):
        self.fed.append(d)
    def get_data(self):
        return ''.join(self.fed)

def strip_tags(html):
    s = MLStripper()
    s.feed(html)
    return s.get_data()


f=open('_private_sheet_content/_sheet-1.json', 'r')

data=json.load(f)

f.close();

authors=open(allquotes, 'w+')

entries=data["feed"]["entry"]

x=set([])
for i in entries:
	x.add(strip_tags(i["gsx$quickquote"]["$t"].encode('utf8')))

for i in x:
	authors.write("%s\n" % i)

authors.close();
# pprint(i["gsx$quickquote"]["$t"])

f=open(allquotes,'r')

c = collections.Counter(
    word.lower()
    for line in f
    for word in re.findall(r'\b[^\W\d_]+[\w-]+\b', line))
f.close()

f=open("_private_sheet_content/_all_quotes_dictionary.pkl","wb")

pickle.dump(c, f)
# f.write("%s\n"%c)
f.close()
