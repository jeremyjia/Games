from flask import Flask
import urllib.request
app = Flask("__main__")

@app.route("/")    
def home():
    url = 'http://news.baidu.com/internet'
    #创建request对象
    req = urllib.request.Request(url)
    #发送请求，获取结果
    with urllib.request.urlopen(req) as response:
        data = response.read()
        content = data.decode()
    #print(content)
    return content
if __name__ == "__main__":
    app.run()
