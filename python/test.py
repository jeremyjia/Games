from flask import Flask 

app = Flask("__main__")

@app.route("/")
def home(): 
    return "xd"

if __name__ == "__main__":
    app.run(host='0.0.0.0',port=8080)
