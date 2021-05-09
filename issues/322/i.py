from flask import Flask

app = Flask("__main__")

@app.route("/")
def home():
    return "hello"

if __name__ == "__main__":
    app.run()
