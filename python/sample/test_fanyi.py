import json
import requests

base_url = 'https://fanyi.baidu.com/sug'
word = input('Please input a English word, such as book\n')
data = {'kw': word}

response = requests.post(base_url, data=data)
json_data = response.json()
print('result:\n')

result = ''
for item in json_data['data']:
      result += item['v'] + "\n"
print(result)
