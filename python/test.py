from flask import Flask
import subprocess

app = Flask("__main__")

@app.route("/")
def home():
    p1 = subprocess.run('ls','-la'],capture_output=True)
    return p1.stdout

if __name__ == "__main__":
    app.run()
