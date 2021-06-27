import json
from datetime import datetime, timedelta
from os import write

print('Test read and update data from a JSON file!')

with open("./data1.json", 'r', encoding='utf-8') as f:
  json_data = json.load(f)
  print(json_data)

index = 1
for item in json_data:
     json_data[item]['timestamp'] = (datetime.today() - timedelta(index)).timestamp()
     index = index+1
# print(json_data)
# build a new file to write
fo = open("./data_new.json", "w")
fo.write( str(json_data) )
fo.close()