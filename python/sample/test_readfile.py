import json
from datetime import datetime, timedelta

print('Test read and update data from a JSON file!')

with open("./data.json", 'r', encoding='utf-8') as f:
  json_data = json.load(f)
  print(json_data)

index = 1
for item in json_data:
     json_data[item]['timestamp'] = (datetime.today() - timedelta(index)).timestamp()
     index = index+1
print(json_data)
