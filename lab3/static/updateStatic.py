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

def update_student(student_id, name, second_name, age, group_id):
    db = get_db()
    cursor = db.cursor()

    update_query = """
        UPDATE students
        SET name = %s, second_name = %s, age = %s, group_id = %s
        WHERE id = %s
    """
    cursor.execute(update_query, (name, second_name, age, group_id, student_id))
    db.commit()

    cursor.close()
    db.close()

def update_group(group_id, name, course, count):
    db = get_db()
    cursor = db.cursor()

    update_query = """
        UPDATE groups
        SET name = %s, course = %s, count = %s
        WHERE id = %s
    """
    cursor.execute(update_query, (name, course, count, group_id))
    db.commit()

    cursor.close()
    db.close()

def update_subject(subject_id, name, teacher, type_id):
    db = get_db()
    cursor = db.cursor()

    update_query = """
        UPDATE subjects
        SET name = %s, teacher = %s, type_id = %s
        WHERE id = %s
    """
    cursor.execute(update_query, (name, teacher, type_id, subject_id))
    db.commit()

    cursor.close()
    db.close()

def update_subj_type(subj_type_id, type):
    db = get_db()
    cursor = db.cursor()

    update_query = """
        UPDATE subj_types
        SET type = %s
        WHERE id = %s
    """
    cursor.execute(update_query, (type, subj_type_id))
    db.commit()

    cursor.close()
    db.close()

def update_grade(grade_id, student_id, subject_id, grade):
    db = get_db()
    cursor = db.cursor()

    update_query = """
        UPDATE grades
        SET student_id = %s, subject_id = %s, grade = %s
        WHERE id = %s
    """
    cursor.execute(update_query, (student_id, subject_id, grade, grade_id))
    db.commit()

    cursor.close()
    db.close()