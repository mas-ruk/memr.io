from flask import Blueprint, render_template
from app import app

bp = Blueprint('main', __name__)

@bp.route('/')
def home():
    return render_template('calendar.html')
