from flask import Flask, render_template, request

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/my-profile")
def my_str():
    stat = None
    stat = request.args.get("stat", "")

    if stat == None or stat == "":
        print("https://www.youtube.com/watch?v=6SsV_d_n69k")

    labels = [1, 2, 3, 4, 5, 6, 7, 8]
    data = [1, 2, 3, 4, 5, 6, 7, 8]

    return render_template("my-profile.html", **locals())

@app.route("/training")
def my_training():
    return render_template("training.html")
