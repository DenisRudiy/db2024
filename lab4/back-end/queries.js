db.students.find();
db.students.findOne();
db.students.findOne({ _id: 5 });

db.grades.find();
db.subjects.find();
db.groups.find();
db.subj_types.find();

db.students.find({ second_name: { $regex: "^D", $options: "i" } });
db.grades.find({ student_id: 5, subject_id: 2 });
db.grades.find({ grade: { $gt: 90 } });
db.grades.find({ grade: { $lt: 80 } });
db.grades.find({ grade: { $gte: 85, $lte: 95 } });

// * Средняя оценка всех студентов
db.grades.aggregate([{ $group: { _id: "$student_id", average_grade: { $avg: "$grade" } } }]);

// * Средняя оценка конкретного студента
db.grades.aggregate([
  { $match: { student_id: your_student_id } },
  { $group: { _id: "$student_id", average_grade: { $avg: "$grade" } } },
]);

// * Имена всех студентов в конкретной группе
db.students.find({ group_id: 1 }, { _id: 0, name: 1, second_name: 1 });
