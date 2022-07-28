#!/usr/bin/env python3


import sys
import os
import time

from bs4 import BeautifulSoup
''' 
Searches files and creates a search index
'''

# Edit this to be the base URL of your website
baseURL = "https://staminachecker.org"

def getTitle(openedFile):
	openedFile.seek(0, 0)
	soup = BeautifulSoup(openedFile.read(), features="lxml")
	if soup.title is None:
		return "No Title"
	return soup.title.string

def getAllContents(openedFile):
	openedFile.seek(0, 0)
	soup = BeautifulSoup(openedFile.read(), features="lxml")
	text = soup.get_text().replace('\n', '').replace('\t', '')
	text = text.replace('☰', '').replace('×', '')
	text = text.replace('"', '\\"')
	return text

def searchFile(filename, out=sys.stdout):
	f = open(filename, 'r')
	print(", {", file=out)
	print(f"title:\"{getTitle(f)}\"", file=out)
	print(f"date:\"{time.ctime(os.path.getmtime(filename))}\"", file=out)
	print(f"url:\"{baseURL}/{filename}\"", file=out)
	print(f"contents:\"{getAllContents(f)}\"", file=out)
	print("}", file=out)
	f.close()

def searchAllFiles(cwd, out=sys.stdout):
	for fileName in os.listdir(cwd):
		if fileName.endswith('.html'):
			searchFile(fileName, out)

if __name__=='__main__':
	searchAllFiles(os.getcwd())
