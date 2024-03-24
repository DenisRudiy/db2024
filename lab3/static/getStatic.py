from flask import g
import psycopg2
from psycopg2.extras import RealDictCursor

DATABASE = {
    'dbname': 'lab1_2024',
    'user': 'l1_user',
    'password': '111',
    'host': 'localhost',
    'port': '5432'
}

def get_db():
    db = getattr(g, '_database', None)
    if db is None:
        db = g._database = psycopg2.connect(**DATABASE, cursor_factory=RealDictCursor)
    return db

def init_db(app):
    with app.app_context():
        db = get_db()
        with app.open_resource('schema.sql', mode='r') as f:
            db.cursor().execute(f.read())
        db.commit()

def get_students():
    db = get_db()
    cursor = db.cursor()
    cursor.execute('SELECT * FROM students')
    students = cursor.fetchall()
    return students

def get_groups():
    db = get_db()
    cursor = db.cursor()
    cursor.execute('SELECT * FROM groups')
    groups = cursor.fetchall()
    return groups

def get_subjects():
    db = get_db()
    cursor = db.cursor()
    cursor.execute('SELECT * FROM subjects')
    subjects = cursor.fetchall()
    return subjects

def get_subj_types():
    db = get_db()
    cursor = db.cursor()
    cursor.execute('SELECT * FROM subj_types')
    subj_types = cursor.fetchall()
    return subj_types

def get_grades():
    db = get_db()
    cursor = db.cursor()
    cursor.execute('SELECT * FROM grades')
    grades = cursor.fetchall()
    return grades

