from sys import argv
from os import listdir, path
from json import JSONEncoder,dump, loads

script, directory = argv

def getAllFilesFrom(directory):
  files = []
  for f in listdir(directory):
    filename, extension = path.splitext(f)
    if extension == ".md":
      files.append(f)
    
  return files
def readFile(filepath):
  try:
    inFile = open(filepath,'r')
    data = inFile.read()
    article = Article()
    headerContent, contentIndex = getMetaData(data)
    header = parseMetaData(headerContent)
    header.publishDate, header.path = getDateAndFileNameFromPath(filepath)
    article.header = header
    article.content = data[contentIndex:]
    inFile.close()
    return article
  finally:
    inFile.close()

def getDateAndFileNameFromPath(filePath):
  fileName = filePath[filePath.rfind("/")+1:]
  format = "yyy-mm-dd"
  date = fileName[:len(format)+1]
  title = "/posts/"+fileName[:-3]
  return date, title

def getMetaData(data):
  TAG = "---"
  openingTagIndex = data.find(TAG)
  closingTagIndex = data.find(TAG,openingTagIndex + 1)
  metaData = data[openingTagIndex + len(TAG): closingTagIndex]
  contentIndex = closingTagIndex + len(TAG)
  return metaData, contentIndex

def parseMetaData(data):
  header = Header()
  for line in data.splitlines():
    if(line.find("title") == 0):
      header.title = line[len("title:"):].strip().replace('"','')
    if(line.find("tag") == 0):
      header.addTag(line[len("tag:"):].strip())
    if(line.find("date") == 0):
      header.publishDate = line[len("date:"):].strip()
  
  return header

def main():
  allFiles = getAllFilesFrom(directory)
  fileList = {"articles": []}
  for (index,eachFile) in enumerate(allFiles):
    article = readFile(directory+eachFile)
    json = MyEncoder().encode(article.header)
    singleArticle = loads(json)
    singleArticle["id"] = index
    fileList["articles"].append(singleArticle)
  print fileList
  with open('db.json', 'w') as fp:
    dump(fileList, fp, indent=4)

class Header():
  
  def __init__(self, title="", publishDate="", tags=[], path=""):
    self.title = title
    self.publishDate = publishDate
    self.tags = []
    self.path = path
  
  def addTag(self,tag):
    self.tags.append(tag)
  def description(self):
    print self.title +" - "+self.publishDate+" - "+self.tag
    print self.enc

class Article(JSONEncoder):
  def __int__(self,header=None, content=""):
    self.header = header
    self.content = content
  def description(self):
    self.header.description()

class MyEncoder(JSONEncoder):
  def default(self, obj):
    return obj.__dict__

if __name__ == "__main__":
  main()


