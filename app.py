from flask import Flask, render_template, request

from backend.db import DbManager


dbManager = DbManager()


app = Flask(__name__)

user_id = "null"


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/training")
def training():
    local_user_id = user_id

    return render_template("training.html", **locals())

@app.route("/training/submit", methods=["POST"])
def training_submit():
    params = request.get_json()

    db_manager_response = dbManager.update_user_stat_table(params["userId"], list(params["exp"].values()))

    return "ok"


@app.route("/my-profile")
def my_profile():
    labels = [1, 2, 3, 4, 5, 6, 7, 8]
    data = [1, 2, 3, 4, 5, 6, 7, 8]

    return render_template("my-profile.html", **locals())


@app.route("/login")
def login():
    return render_template("login.html")

@app.route("/login/submit", methods=["POST"])
def login_submit():
    params = request.get_json()

    user_id = params["user_id"]

    db_manager_respond = dbManager.select_user_account_from_user_account_table_where_user_id_and_user_pw(params["user_id"], params["user_pw"])

    if db_manager_respond != "ok":
        return db_manager_respond

    return "ok"


@app.route("/signup")
def signup():
    return render_template("signup.html")

@app.route("/signup/submit", methods=["POST"])
def signup_submit():
    params = request.get_json()

    db_manager_respond = dbManager.append_user_account_into_user_account_table(params["user_id"], params["user_pw"], params["user_nickname"], params["user_email"])

    if db_manager_respond != "ok":
        return db_manager_respond
    
    db_manager_respond = dbManager.create_new_user_stat_table(params["user_id"])

    if db_manager_respond != "ok":
        return db_manager_respond

    return "ok"