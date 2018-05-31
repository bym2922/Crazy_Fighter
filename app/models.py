from app.extensions import db,login_manager
from werkzeug.security import generate_password_hash,check_password_hash
from itsdangerous import TimedJSONWebSignatureSerializer as Serlizer
from .config import Config
from flask_login import UserMixin
from app.DBUtils import DButils


class User(UserMixin,db.Model, DButils):

    __tablename__ = 'user'
    id = db.Column(db.Integer,primary_key=True)
    username = db.Column(db.String(30),unique=True)
    password_hash = db.Column(db.String(100))
    email = db.Column(db.String(60),unique=True)
    confirm = db.Column(db.Boolean,default=False)

    @property
    def password(self):
        raise AttributeError('密码不可读！')

    @password.setter
    def password(self,password):
        # 将表单传过来的密码加密后存到数据库
        self.password_hash = generate_password_hash(password)

    def make_active_token(self):
        # 将密钥序列化
        s = Serlizer(Config.SECRET_KEY)
        # 将字典转化成字符串并返回
        return s.dumps({'id':self.id})


    @staticmethod
    def check_token(token):
        s = Serlizer(Config.SECRET_KEY)
        try:
            #将传回来的token转成字典形式
            data = s.loads(token)
        except:
            return False
        # 与数据库进行比对
        u = User.query.get(data['id'])
        if not u:
            return False
        elif not u.confirm:
            u.confirm = True
            db.session.add(u)
        return True

    #验证密码是否正确
    def check_password(self,password):
        return check_password_hash(self.password_hash,password)

@login_manager.user_loader
def load_user(uid):
    return User.query.get(int(uid))