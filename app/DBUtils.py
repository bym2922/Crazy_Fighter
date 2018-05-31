from .extensions import db

class DButils:
    def save(self):
        try:
            db.session.add(self)
            db.session.commit()
            return True
        except Exception as e:
            print(e)
            db.session.rollback()
            return False

    def save_all(self):
        try:
            db.session.add_all(self)
            db.session.commit()
            return True
        except:
            db.session.rollback()
            return False


    def delete(self):
        try:
            db.session.delete(self)
            db.session.commit()
            return True
        except:
            db.session.rollback()
            return False



