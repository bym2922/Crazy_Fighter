from .extensions import mail
from flask_mail import Message
from threading import Thread
from flask import current_app,render_template

def asyncmail(app,msg):
    with app.app_context():
        mail.send(msg)

def sync(to,subject,template,**kwargs):
    app = current_app._get_current_object()
    msg = Message(subject=subject, recipients=[to],sender=app.config['MAIL_USERNAME'])
    msg.body = "哈哈哈"
    msg.html = render_template(template+'.html',**kwargs)
    thread = Thread(target=asyncmail,args=[app,msg])
    thread.start()
    return thread