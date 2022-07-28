#!/usr/bin/env python3


import sys
''' 
Searches files and creates a search index
'''

# Edit this to be the base URL of your website
baseURL = "https://staminachecker.org"

def getTitle(openedFile):
	pass

def getAllContents(openedFile):
	pass

def searchFile(filename, out=sys.stdout):
	f = open(filename, 'r')
	print("{", file=out)
	print(f"title:\"{getTitle(f)}\"", file=out)
	print(f"date:\"TODO\"", file=out) # TODO: get date
	print(f"url:\"{baseURL}/{filename}\"", file=out)
	print("}", file=out)
	f.close()
