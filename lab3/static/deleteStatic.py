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
    return psycopg2.connect(**DATABASE)

def delete_student(student_id):
    db = get_db()
    cursor = db.cursor()
    cursor.execute('DELETE FROM students WHERE id = %s;', (student_id,))
    db.commit()

def delete_group(group_id):
    db = get_db()
    cursor = db.cursor()
    cursor.execute('DELETE FROM groups WHERE id = %s;', (group_id,))
    db.commit()

def delete_subject(subject_id):
    db = get_db()
    cursor = db.cursor()
    cursor.execute('DELETE FROM subjects WHERE id = %s;', (subject_id,))
    db.commit()

def delete_subject_type(subject_type_id):
    db = get_db()
    cursor = db.cursor()
    cursor.execute('DELETE FROM subj_types WHERE id = %s;', (subject_type_id,))
    db.commit()

def delete_grade(grade_id):
    db = get_db()
    cursor = db.cursor()
    cursor.execute('DELETE FROM grades WHERE id = %s;', (grade_id,))
    db.commit()