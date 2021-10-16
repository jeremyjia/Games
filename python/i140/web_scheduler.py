from apscheduler.schedulers.blocking import BlockingScheduler
from datetime import datetime
import requests

# 输出时间
def job():
    url = 'http://www.jb51.net'
    data = requests.get(url)
    code = data.status_code

    if code != 200:
        print('网站无法响应，进行下线处理')

    else:
        print('当前时间：' + datetime.now().strftime('%Y-%m-%d %H:%M:%S') + '状态码：')
        print(code)
        # 设置定时器 BlockScheduler

sched = BlockingScheduler()
sched.add_job(job, "interval", seconds=5)
sched.start()