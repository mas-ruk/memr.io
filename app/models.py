from app import db

class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    weekStart = db.Column(db.DateTime)
    dayOfWeek = db.Column(db.Integer) # 0-6 representing Mon-Sun
    isCompleted = db.Column(db.Boolean, default=False)
    parentID = db.Column(db.Integer, db.ForeignKey('task.id'), nullable=True) # recursive foreign key reference
    