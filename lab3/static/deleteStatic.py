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
    cursor.execute('CALL update_std_ids(%s);', (student_id,))
    cursor.execute("SELECT MAX(id) FROM students")
    max_id = cursor.fetchone()[0]
    cursor.execute('ALTER SEQUENCE students_id_seq RESTART WITH %s;', (max_id+1,))
    db.commit()

def delete_group(group_id):
    db = get_db()
    cursor = db.cursor()
    cursor.execute('DELETE FROM groups WHERE id = %s;', (group_id,))
    cursor.execute('CALL update_group_ids(%s);', (group_id,))
    cursor.execute("SELECT MAX(id) FROM groups")
    max_id = cursor.fetchone()[0]
    cursor.execute('ALTER SEQUENCE groups_id_seq RESTART WITH %s;', (max_id+1,))
    db.commit()

def delete_subject(subject_id):
    db = get_db()
    cursor = db.cursor()
    cursor.execute('DELETE FROM subjects WHERE id = %s;', (subject_id,))
    cursor.execute('CALL update_subj_ids(%s);', (subject_id,))
    cursor.execute("SELECT MAX(id) FROM subjects")
    max_id = cursor.fetchone()[0]
    cursor.execute('ALTER SEQUENCE subjects_id_seq RESTART WITH %s;', (max_id+1,))
    db.commit()

def delete_subject_type(subject_type_id):
    db = get_db()
    cursor = db.cursor()
    cursor.execute('DELETE FROM subj_types WHERE id = %s;', (subject_type_id,))
    cursor.execute('CALL update_subj_type_ids(%s);', (subject_type_id,))
    cursor.execute("SELECT MAX(id) FROM subj_types")
    max_id = cursor.fetchone()[0]
    cursor.execute('ALTER SEQUENCE subj_types_id_seq RESTART WITH %s;', (max_id+1,))
    db.commit()

def delete_grade(grade_id):
    db = get_db()
    cursor = db.cursor()
    cursor.execute('DELETE FROM grades WHERE id = %s;', (grade_id,))
    cursor.execute('CALL update_grade_ids(%s);', (grade_id,))
    cursor.execute("SELECT MAX(id) FROM grades")
    max_id = cursor.fetchone()[0]
    cursor.execute('ALTER SEQUENCE grades_id_seq RESTART WITH %s;', (max_id+1,))
    db.commit()