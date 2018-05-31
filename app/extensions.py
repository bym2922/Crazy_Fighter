from flask_sqlalchemy import SQLAlchemy
from flask_mail import Mail
from flask_migrate import Migrate
from flask_login import LoginManager

db = SQLAlchemy()
mail = Mail()
migrate = Migrate(db=db)
login_manager = LoginManager()

def config_extensions(app):
    db.init_app(app)
    mail.init_app(app)
    migrate.init_app(app)
    login_manager.init_app(app)
    login_manager.login_view = 'index'
    login_manager.login_message = '登录后才可以进行游戏哦-_-'
    login_manager.session_protection = 'strong'