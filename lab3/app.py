from flask import Flask, g, jsonify, render_template, request

from static.getStatic import get_students, get_groups, get_subjects, get_subj_types,get_grades, init_db

from static.createStatic import create_student, create_group, create_subject, create_subj_types, create_grade

from static.deleteStatic import delete_student, delete_group, delete_subject, delete_subject_type, delete_grade

from static.updateStatic import update_student, update_group, update_subject, update_subj_type, update_grade

app = Flask(__name__)

def create_connection():
    conn = None
    try:
        conn = psycopg2.connect(**DATABASE)
    except psycopg2.Error as e:
        print(e)
    return conn

# * Database initialization route
@app.route('/init_db')
def initialize_db():
    init_db(app)
    return jsonify({'message': 'Database initialized successfully'}), 200

# *                                                     Routes to get data
@app.route('/students', methods=['GET'])
def students_route():
    students = get_students()
    return jsonify({'students': students})

@app.route('/groups', methods=['GET'])
def groups_route():
    groups = get_groups()
    return jsonify({'groups': groups})

@app.route('/subjects', methods=['GET'])
def subjects_route():
    subjects = get_subjects()
    return jsonify({'subjects': subjects})

@app.route('/subj_types', methods=['GET'])
def subj_types_route():
    subj_types = get_subj_types()
    return jsonify({'subj_types': subj_types})
    
@app.route('/grades', methods=['GET'])
def grades_route():
    grades = get_grades()
    return jsonify({'grades': grades})

# *                                                     Routes to create data
@app.route('/cr_students', methods=['POST'])
def create_student_route():
    data = request.get_json()
    name = data.get('name')
    second_name = data.get('second_name')
    age = data.get('age')
    group_id = data.get('group_id')
    
    if not all([name, second_name, age, group_id]):
        return jsonify({'error': 'Missing data. Please provide name, second_name, age, and group_id.'}), 400
    
    student_id = create_student(name, second_name, age, group_id)
    return jsonify({'message': 'Student added successfully', 'student_id': student_id}), 201

@app.route('/cr_groups', methods=['POST'])
def create_group_route():
    data = request.get_json()
    name = data.get('name')
    course = data.get('course')
    count = data.get('count')
    
    if not all([name, course, count]):
        return jsonify({'error': 'Missing data. Please provide name, course, and count.'}), 400
    
    group_id = create_group(name, course, count)
    return jsonify({'message': 'Group added successfully', 'group_id': group_id}), 201

@app.route('/cr_subjects', methods=['POST'])
def create_subject_route():
    data = request.get_json()
    name = data.get('name')
    teacher = data.get('teacher')
    type_id = data.get('type_id')
    
    if not all([name, teacher, type_id]):
        return jsonify({'error': 'Missing data. Please provide name, teacher, and type_id.'}), 400
    
    subj_id = create_subject(name, teacher, type_id)
    return jsonify({'message': 'Subject added successfully', 'subj_id': subj_id}), 201

@app.route('/cr_subj_types', methods=['POST'])
def create_subj_type_route():
    data = request.get_json()
    type = data.get('type')
    
    if not all([type]):
        return jsonify({'error': 'Missing data. Please provide type.'}), 400
    
    subj_type_id = create_subj_types(type)
    return jsonify({'message': 'Subject_type added successfully', 'subj_type_id': subj_type_id}), 201

@app.route('/cr_grades', methods=['POST'])
def create_grades_route():
    data = request.get_json()
    student_id = data.get('student_id')
    subject_id = data.get('subject_id')
    grade = data.get('grade')
    
    if not all([student_id, student_id, subject_id]):
        return jsonify({'error': 'Missing data. Please provide student_id, student_id and subject_id.'}), 400
    
    grade_id = create_grade(student_id, student_id, subject_id)
    return jsonify({'message': 'Grade added successfully', 'grade_id': grade_id}), 201


# *                                                     Routes to delete data
@app.route('/delete_student/<int:student_id>', methods=['DELETE'])
def delete_student_route(student_id):
    delete_student(student_id)
    return jsonify({'message': 'Student deleted successfully'}), 200

@app.route('/delete_group/<int:group_id>', methods=['DELETE'])
def delete_group_route(group_id):
    delete_group(group_id)
    return jsonify({'message': 'Group deleted successfully'}), 200

@app.route('/delete_subject/<int:subject_id>', methods=['DELETE'])
def delete_subject_route(subject_id):
    delete_subject(subject_id)
    return jsonify({'message': 'Subject deleted successfully'}), 200

@app.route('/delete_subj_type/<int:subject_type_id>', methods=['DELETE'])
def delete_subject_type_route(subject_type_id):
    delete_subject_type(subject_type_id)
    return jsonify({'message': 'Subject type deleted successfully'}), 200

@app.route('/delete_grade/<int:grade_id>', methods=['DELETE'])
def delete_grade_route(grade_id):
    delete_grade(grade_id)
    return jsonify({'message': 'Grade deleted successfully'}), 200


# *                                                     Routes to update data
@app.route('/update_student/<int:student_id>', methods=['PUT'])
def update_student_route(student_id):
    data = request.get_json()
    name = data.get('name')
    second_name = data.get('second_name')
    age = data.get('age')
    group_id = data.get('group_id')

    if not all([name, second_name, age, group_id]):
        return jsonify({'error': 'Missing data. Please provide name, second_name, age, and group_id.'}), 400
    
    update_student(student_id, name, second_name, age, group_id)
    return jsonify({'message': 'Student updated successfully'}), 200

@app.route('/update_group/<int:group_id>', methods=['PUT'])
def update_group_route(group_id):
    data = request.get_json()
    name = data.get('name')
    course = data.get('course')
    count = data.get('count')

    if not all([name, course, count]):
        return jsonify({'error': 'Missing data. Please provide name, course and count.'}), 400
    
    update_group(group_id, name, course, count)
    return jsonify({'message': 'Group updated successfully'}), 200

@app.route('/update_subject/<int:subj_id>', methods=['PUT'])
def update_subject_route(subj_id):
    data = request.get_json()
    name = data.get('name')
    teacher = data.get('teacher')
    type_id = data.get('type_id')

    if not all([name, teacher, type_id]):
        return jsonify({'error': 'Missing data. Please provide name, teacher and type_id.'}), 400
    
    update_subject(subj_id, name, teacher, type_id)
    return jsonify({'message': 'Subject updated successfully'}), 200

@app.route('/update_subj_type/<int:subj_type_id>', methods=['PUT'])
def update_subj_types_route(subj_type_id):
    data = request.get_json()
    type = data.get('type')

    if not all([type]):
        return jsonify({'error': 'Missing data. Please provide type.'}), 400
    
    update_subj_type(subj_type_id, type)
    return jsonify({'message': 'Subject type updated successfully'}), 200

@app.route('/update_grade/<int:grade_id>', methods=['PUT'])
def update_grade_route(grade_id):
    data = request.get_json()
    student_id = data.get('student_id')
    subject_id = data.get('subject_id')
    grade = data.get('grade')

    if not all([student_id, subject_id, grade]):
        return jsonify({'error': 'Missing data. Please provide student_id, subject_id and grade.'}), 400
    
    update_grade(grade_id, student_id, subject_id, grade)
    return jsonify({'message': 'Grade updated successfully'}), 200


# * Home route
@app.route('/')
def home():
    return render_template('index.html', message='Hello, Flask!')

if __name__ == '__main__':
    app.run(debug=True)
