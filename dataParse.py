import scipy.io
import numpy as np
import json

mat = scipy.io.loadmat('sampleData.mat')
data = mat['data']

print(data.shape)


testData = data[0: 100000, :]

jsonString = json.dumps(testData.tolist())

f = open('testDataFormatted.json', 'w')
f.write(jsonString)
f.close()


print(np.amin(testData.flatten()), np.amax(testData.flatten()))