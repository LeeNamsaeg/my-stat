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

    def init_new_user_stat_table(self, user_id):
        if user_id == "":
            return "invalid value issue"
        
        try:
            self.cur.execute(f"insert into user_stat_table values ('{user_id}', {0}, {0}, {0}, {0}, {0}, {0});")
        
        except pymysql.Error as err:
            code, msg = err.args

            if code == 1062:
                return "duplicated value issue"

        self.conn.commit()

        return "ok"
    
    def get_user_stat_from_user_stat_table(self, user_id):
        selection_result = self.cur.execute(f"select * from user_stat_table where user_id = '{user_id}';")    
        
        row_value = self.cur.fetchall()

        return row_value[0]

    def update_user_stat_table(self, user_id, user_stats): # language, logical, historical, cardiopulmonary, muscularS, muscularE
        row_value = self.get_user_stat_from_user_stat_table(user_id)

        final_row_value = []

        for i in range(1, len(row_value)): # 1: user_id
            final_row_value.append(row_value[i] + user_stats[i - 1])

        self.cur.execute(f"update user_stat_table set language_intelligence={final_row_value[0]}, logical_intelligence={final_row_value[1]}, historical_intelligence={final_row_value[2]}, cardiopulmonary_endurance={final_row_value[3]}, muscular_strength={final_row_value[4]}, muscular_endurance={final_row_value[5]};")
        # 유저마다 테이블 만들어서 관리하기

        self.conn.commit()

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