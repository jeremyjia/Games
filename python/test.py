from flask import Flask
app = Flask(__name__)

@app.route("/")
def hello():
    return "Hello World!"

    
@app.route("/api/NewPlayer")
def NewPlayer():
    return "Hello NewPlayer!"

     
@app.route("/api/checkUserName")
def checkUserName():
    return "Hello checkUserName!"

     
if __name__ == '__main__':
    app.run(host="localhost", port=8080, debug=True)

    
 
