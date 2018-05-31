import os
class Config():
    SECRET_KEY = os.environ.get('SECRET_KEY','123456')
    # 配置smtp服务器
    MAIL_SERVER = os.environ.get('MAIL_SERVER', 'smtp.qq.com')
    # 用户名
    MAIL_USERNAME = os.environ.get('MAIL_USERNAME', '1824399664@qq.com')
    # 密码
    MAIL_PASSWORD = os.environ.get('MAIL_PASSWORD', 'whokelstwocubbdd')
    MAIL_USE_TLS = True
    MAX_CONTENT_LENGTH = 8*1024*1024
    DEBUG = True
    # 数据发生改变不追踪
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    # 数据自动提交
    SQLALCHEMY_COMMIT_ON_TEARDOWN = True
    # 配置sqlite数据库路径
    SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(os.path.abspath(os.path.dirname(__file__)), 'user')