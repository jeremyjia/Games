import requests
import json
import time

# user_define_setting
AK = 'htW6tTwur0gG32n2iDnaEsWZ'
SK = 'v6q1cZPTGI2Togc8ZhHSXeIrRHqGRlhE'
token_url = 'https://aip.baidubce.com/oauth/2.0/token?grant_type=client_credentials&client_id={}&client_secret={}'.format(AK, SK)
create_url = 'https://aip.baidubce.com/rpc/2.0/aasr/v1/create'
query_url = 'https://aip.baidubce.com/rpc/2.0/aasr/v1/query'
audio_url = "https://www.xzmp3.com/down/f77054e5bbc5.mp3"
#audio_url = "https://av.voanews.com/clips/VLE/2022/06/17/7b76fccf-1ccf-4c33-82c2-285c2f736341.mp3" #"你的音频所在url 推荐使用gitee 其他的能用的url都可以。"

access_token = json.loads(requests.get(token_url).text)['access_token']
print(access_token)
create_json = {
        "speech_url": audio_url,
        "format": audio_url.split('.')[-1],
        "pid": 1537,
        "rate": 16000
    }
create_query_params = {'access_token': access_token}
task_id = []
c = requests.post(create_url, json=create_json, params=create_query_params).text
print(c)
# 启动任务,获取task_id
task_id.append(json.loads(requests.post(create_url, json=create_json, params=create_query_params).text)['task_id'])

# 查询任务执行情况
response2 = requests.post(url=query_url, json={"task_ids": task_id}, params=create_query_params)

# 等待程序执行结束
while True:
    if(json.loads(response2.text)['tasks_info'][0]['task_status'] != 'Success'):
        print('waiting 10s...')
        time.sleep(10)
        response2 = requests.post(url=query_url, json={"task_ids": task_id}, params=create_query_params)
    else:
        break
# 输出语音执行结果
print(json.loads(response2.text)['tasks_info'][0]['task_result']['result'][0])