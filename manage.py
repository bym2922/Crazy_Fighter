from flask import Flask,render_template,request,flash,redirect,url_for, get_flashed_messages
from flask_script import Manager
from flask_migrate import MigrateCommand
from app import config_extensions,Config,User,sync
from flask_login import login_user,login_required

app = Flask(__name__, static_folder='', static_url_path='')
app.config.from_object(Config)
manage = Manager(app)
manage.add_command('db',MigrateCommand)
config_extensions(app)

@app.route('/',methods=['post','get'])
def index():
    data = {
        'uname': '请输入用户名',
        'pass': '请输入密码',
    }
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        print(username)
        if username != (''and None) and password != (''and None):
            u = User.query.filter_by(username=username).first()
            if not u:
                # print('用户不存在！')
                data['uname'] = '用户不存在！'
            elif not u.confirm:
                # print('请先激活你的账户！')
                flash('请先激活你的账户！')
            elif not u.check_password(password):
                data['pass'] = '密码错误！'
                # print('密码错误！')
            else:
                login_user(u, remember=username)
                # print('登陆成功！')
                return render_template('index.html')
    return render_template('login.html',data = data)


@app.route('/register/',methods=['post','get'])
def register():
    data = {
        'uname': '请输入用户名',
        'pass': '请输入密码',
        'emai': '请输入邮箱',
    }
    if request.method=='POST':
        username = request.form.get('username')
        password = request.form.get('password')
        email = request.form.get('email')
        if username !=(''and None) and password != (''and None) and email != (''and None):
            user = User.query.filter_by(username=username).first()
            emai = User.query.filter_by(email=email).first()
            if user:
                data['uname'] = '该用户名已存在'
            elif len(password)<4:
                data['pass'] = '密码长度应大于四位数'
            elif emai:
                data['emai'] = '该邮箱已被注册'
            else:
                u = User(username=username,password=password,email=email)
                u.save()
                token = u.make_active_token()
                sync(u.email,'账号激活','active',username = u.username,token=token)
                flash('注册成功，请接收邮件激活账号再登录!')
                return redirect(url_for('index'))
    return render_template('register.html',data=data)

@app.route('/active/<token>')
def active(token):
    if User.check_token(token):
        return '<h1>您已成功激活，快去登录吧！</h1>'
    else:
        return '<h1>激活失败,请重新激活后再登录！</h1>'


@app.route('/choose/')
@login_required
def choose():
    return render_template('choose.html')

@app.route('/first/')
@login_required
def first():
    return render_template('first.html')

@app.route('/secondry/')
@login_required
def secondry():
    return render_template('secondry.html')

@app.route('/three/')
@login_required
def three():
    return render_template('three.html')


if __name__ == "__main__":
    manage.run()