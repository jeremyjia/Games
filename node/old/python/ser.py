import pickle

exampleObj = {'Python':31,'KDE':5,'Windows':10}

fileObj = open('data.obj', 'wb')
pickle.dump(exampleObj,fileObj)
fileObj.close()

fileObj = open('data.obj', 'rb')
exampleObj = pickle.load(fileObj)
fileObj.close()
print(exampleObj)