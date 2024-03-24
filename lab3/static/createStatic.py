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

def create_student(name, second_name, age, group_id):
    db = get_db()
    cursor = db.cursor()
    cursor.execute('INSERT INTO students (name, second_name, age, group_id) VALUES (%s, %s, %s, %s) RETURNING id', (name, second_name, age, group_id))
    student_id = cursor.fetchone()[0]
    db.commit()

    cursor.execute('ALTER SEQUENCE students_id_seq RESTART WITH %s;', (student_id+1,))
    db.commit()

    return student_id

def create_group(name, course, count):
    db = get_db()
    cursor = db.cursor()
    cursor.execute('INSERT INTO groups (name, course, count) VALUES (%s, %s, %s) RETURNING id', (name, course, count))
    group_id = cursor.fetchone()[0]
    db.commit()

    cursor.execute('ALTER SEQUENCE groups_id_seq RESTART WITH %s;', (group_id+1,))
    db.commit()

    return group_id

def create_subject(name, teacher, type_id):
    db = get_db()
    cursor = db.cursor()
    cursor.execute('INSERT INTO subjects (name, teacher, type_id) VALUES (%s, %s, %s) RETURNING id', (name, teacher, type_id))
    subj_id = cursor.fetchone()[0]
    db.commit()

    cursor.execute('ALTER SEQUENCE subjects_id_seq RESTART WITH %s;', (subj_id+1,))
    db.commit()

    return subj_id

def create_subj_types(type):
    db = get_db()
    cursor = db.cursor()
    cursor.execute('INSERT INTO subj_types (type) VALUES (%s) RETURNING id', (type,))
    subj_type_id = cursor.fetchone()[0]
    db.commit()

    cursor.execute('ALTER SEQUENCE subj_types_id_seq RESTART WITH %s;', (subj_type_id+1,))
    db.commit()

    return subj_type_id

def create_grade(student_id, subject_id, grade):
    db = get_db()
    cursor = db.cursor()
    cursor.execute('INSERT INTO grades (student_id, subject_id, grade) VALUES (%s, %s, %s) RETURNING id', (student_id, subject_id, grade))
    grade_id = cursor.fetchone()[0]
    db.commit()

    cursor.execute('ALTER SEQUENCE grades_id_seq RESTART WITH %s;', (grade_id+1,))
    db.commit()

    return grade_id