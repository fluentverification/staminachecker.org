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
json = False
recurse = False

def getTitle(openedFile):
	openedFile.seek(0, 0)
	soup = BeautifulSoup(openedFile.read(), features="lxml")
	if soup.title is None:
		return "No Title"
	return soup.title.string

def getAllContents(openedFile):
	openedFile.seek(0, 0)
	soup = BeautifulSoup(openedFile.read(), features="lxml")
	content = soup.find(class_="content")
	if content is not None:
		text = content.get_text().replace('\n', ' ').replace('\t', ' ')
	else:
		text = soup.get_text()
	text = text.replace('☰', '').replace('×', '')
	text = text.replace('"', '\\"')
	return text

def searchFile(filename, out=sys.stdout):
	f = open(filename, 'r')
	qu = ''
	if json:
		qu = '\"'
		print(", {", file=out)
	else:
		print(", [", file=out)
	print(f"{qu}title{qu}:\"{getTitle(f)}\"", file=out)
	print(f", {qu}date{qu}:\"{time.ctime(os.path.getmtime(filename))}\"", file=out)
	print(f", {qu}url{qu}:\"{baseURL}/{filename}\"", file=out)
	print(f", {qu}content{qu}:\"{getAllContents(f)}\"", file=out)
	if json:
		print("}", file=out)
	else:
		print("]", file=out)
	f.close()

def searchAllFiles(cwd, out=sys.stdout, recurse=False):
	for fileName in os.listdir(cwd):
		if fileName.endswith('.html'):
			searchFile(f"{cwd}/{fileName}", out)
		elif recurse and os.path.isdir(fileName):
			searchAllFiles(f"{cwd}/{fileName}")

if __name__=='__main__':
	if "--json" in sys.argv or "-j" in sys.argv:
		json = True
	if "-r" in sys.argv or "--recurse" in sys.argv:
		recurse = True
	# Get base URL. Yeah this is ugly but I'm lazy
	try:
		try:
			bIndex = sys.argv.index("--base")
		except ValueError:
			pass
		bIndex = sys.argv.index("-b")
		try:
			baseURL = sys.argv[bIndex + 1]
		except IndexError:
			print("Missing base URL after -b/--base param!")
			sys.exit(1)
	except ValueError:
		# Does not exist
		pass
	if not ("-h" in sys.argv or "--help" in sys.argv):
		searchAllFiles(os.getcwd(), recurse=recurse)
	else:
		print("Options:")
		print("\t--recurse/-r:   Recurses subdirectories")
		print("\t--help/-h:      Shows this message")
		print("\t--json/-j:      Exports in JSON")
		print("\t--base/-b:      Base URL (default https://staminachecker.org")

# https://www.tutorialspoint.com/how-to-import-local-json-file-data-to-my-javascript-variable
