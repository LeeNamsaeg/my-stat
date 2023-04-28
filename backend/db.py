import pymysql

class DbManager:
    def __init__(self):
        self.conn = pymysql.connect(
            host="127.0.0.1",
            user="root",
            password="wnsgus123@",
            db="stat_chang_db",
            charset='utf8'
        )

        self.cur = self.conn.cursor()

    def append_user_account_into_user_account_table(self, user_id, user_pw, user_nickname, user_email):
        if user_id == "" or user_pw == "" or user_nickname == "" or user_email == "":
            return "invalid value issue"
    
        try:
            self.cur.execute(f"insert into user_account_table values ('{user_id}', '{user_pw}', '{user_nickname}', '{user_email}');")

        except pymysql.Error as err:
            code, msg = err.args

            if code == 1062:
                return "duplicated value issue"

        self.conn.commit()

        return "ok"
    
    def select_user_account_from_user_account_table_where_user_id_and_user_pw(self, user_id, user_pw):
        if user_id == "" or user_pw == "":
            return "invalid value issue"
        
        selection_result = self.cur.execute(f"select * from user_account_table where id = '{user_id}' and pw = '{user_pw}';")

        if selection_result == 0:
            return "cannot find value"
        else:
            return "ok"