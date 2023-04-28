from flask import Flask, render_template, request

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/training")
def training():
    return render_template("training.html")

@app.route("/my-profile")
def my_profile():
    labels = [1, 2, 3, 4, 5, 6, 7, 8]
    data = [1, 2, 3, 4, 5, 6, 7, 8]

    return render_template("my-profile.html", **locals())

@app.route("/login")
def login():
    return render_template("login.html")

@app.route("/signup")
def signup():
    return render_template("signup.html")