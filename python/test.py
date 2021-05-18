from flask import Flask 

app = Flask("__main__")

@app.route("/")
def home(): 
    return "xd"

if __name__ == "__main__":
    app.run(host='127.0.0.1',port=3000)
