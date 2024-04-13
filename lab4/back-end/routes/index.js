const { MongoClient } = require("mongodb");
const express = require("express");
const router = express.Router();
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function connect() {
  try {
    await client.connect();
    console.log("Подключение к MongoDB установлено");
  } catch (error) {
    console.error("Ошибка при подключении к MongoDB:", error);
  }
}

connect();
module.exports = client;

// *
// *
// *                         // * GET ALL
router.get("/students", async (req, res) => {
  try {
    const db = client.db("lab4_2024");
    const collection = db.collection("students");
    const documents = await collection.find().sort({ _id: 1 }).toArray();
    res.json(documents);
  } catch (error) {
    res.status(500).json({ message: "Ошибка при получении данных из базы данных" });
  }
});
router.get("/groups", async (req, res) => {
  try {
    const db = client.db("lab4_2024");
    const collection = db.collection("groups");
    const documents = await collection.find().sort({ _id: 1 }).toArray();
    res.json(documents);
  } catch (error) {
    res.status(500).json({ message: "Ошибка при получении данных из базы данных" });
  }
});
router.get("/subjects", async (req, res) => {
  try {
    const db = client.db("lab4_2024");
    const collection = db.collection("subjects");
    const documents = await collection.find().sort({ _id: 1 }).toArray();
    res.json(documents);
  } catch (error) {
    res.status(500).json({ message: "Ошибка при получении данных из базы данных" });
  }
});
router.get("/subj_types", async (req, res) => {
  try {
    const db = client.db("lab4_2024");
    const collection = db.collection("subj_types");
    const documents = await collection.find().sort({ _id: 1 }).toArray();
    res.json(documents);
  } catch (error) {
    res.status(500).json({ message: "Ошибка при получении данных из базы данных" });
  }
});
router.get("/grades", async (req, res) => {
  try {
    const db = client.db("lab4_2024");
    const collection = db.collection("grades");
    const documents = await collection.find().sort({ _id: 1 }).toArray();
    res.json(documents);
  } catch (error) {
    res.status(500).json({ message: "Ошибка при получении данных из базы данных" });
  }
});

// *
// *
// *                         // * GET BY ID
router.get("/students/:id", async (req, res) => {
  try {
    const db = client.db("lab4_2024");
    const collection = db.collection("students");

    const id = parseInt(req.params.id);

    const student = await collection.findOne({ _id: id });

    if (student) {
      res.json(student);
    } else {
      res.status(404).json({ message: "Студент не найден" });
    }
  } catch (error) {
    res.status(500).json({ message: "Ошибка при получении данных из базы данных" });
  }
});

router.get("/groups/:id", async (req, res) => {
  try {
    const db = client.db("lab4_2024");
    const collection = db.collection("groups");

    const id = parseInt(req.params.id);
    const group = await collection.findOne({ _id: id });

    if (group) {
      res.json(group);
    } else {
      res.status(404).json({ message: "Группа не найдена" });
    }
  } catch (error) {
    res.status(500).json({ message: "Ошибка при получении данных из базы данных" });
  }
});

router.get("/subjects/:id", async (req, res) => {
  try {
    const db = client.db("lab4_2024");
    const collection = db.collection("subjects");

    const id = parseInt(req.params.id);

    const subject = await collection.findOne({ _id: id });

    if (subject) {
      res.json(subject);
    } else {
      res.status(404).json({ message: "Предмет не найден" });
    }
  } catch (error) {
    res.status(500).json({ message: "Ошибка при получении данных из базы данных" });
  }
});

router.get("/subj_types/:id", async (req, res) => {
  try {
    const db = client.db("lab4_2024");
    const collection = db.collection("subj_types");

    const id = parseInt(req.params.id);

    const subj_type = await collection.findOne({ _id: id });

    if (subj_type) {
      res.json(subj_type);
    } else {
      res.status(404).json({ message: "Тип предмета не найден" });
    }
  } catch (error) {
    res.status(500).json({ message: "Ошибка при получении данных из базы данных" });
  }
});

router.get("/grades/:id", async (req, res) => {
  try {
    const db = client.db("lab4_2024");
    const collection = db.collection("grades");

    const id = parseInt(req.params.id);

    const grade = await collection.findOne({ _id: id });

    if (grade) {
      res.json(grade);
    } else {
      res.status(404).json({ message: "Оценка не найдена" });
    }
  } catch (error) {
    res.status(500).json({ message: "Ошибка при получении данных из базы данных" });
  }
});

// *
// *
// *                         // * CREATE
router.post("/new_student", async (req, res) => {
  try {
    const db = client.db("lab4_2024");
    const collection = db.collection("students");

    const newStudent = req.body;

    const result = await collection.insertOne(newStudent);

    res.send("Student added successfully");
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).json({ error: "An error occurred" });
  }
});
router.post("/new_group", async (req, res) => {
  try {
    const db = client.db("lab4_2024");
    const collection = db.collection("groups");

    const newGroup = req.body;

    const result = await collection.insertOne(newGroup);

    res.send("Group added successfully");
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).json({ error: "An error occurred" });
  }
});
router.post("/new_subject", async (req, res) => {
  try {
    const db = client.db("lab4_2024");
    const collection = db.collection("subjects");

    const newSubject = req.body;

    const result = await collection.insertOne(newSubject);

    res.send("Subject added successfully");
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).json({ error: "An error occurred" });
  }
});
router.post("/new_subj_type", async (req, res) => {
  try {
    const db = client.db("lab4_2024");
    const collection = db.collection("subj_types");

    const newSubjType = req.body;

    const result = await collection.insertOne(newSubjType);

    res.send("Subject Type added successfully");
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).json({ error: "An error occurred" });
  }
});
router.post("/new_grade", async (req, res) => {
  try {
    const db = client.db("lab4_2024");
    const collection = db.collection("grades");

    const newGrade = req.body;

    const result = await collection.insertOne(newGrade);

    res.send("Grade added successfully");
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

// *
// *
// *                         // * UPDATE

router.put("/update_student/:id", async (req, res) => {
  try {
    const db = client.db("lab4_2024");
    const collection = db.collection("students");
    const id = parseInt(req.params.id);
    const { name, second_name, age, group_id } = req.body;

    const result = await collection.updateOne(
      { _id: id },
      { $set: { name: name, second_name: second_name, age: age, group_id: group_id } }
    );

    res.send("Student updated successfully");
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).json({ error: "An error occurred" });
  }
});
router.put("/update_group/:id", async (req, res) => {
  try {
    const db = client.db("lab4_2024");
    const collection = db.collection("groups");
    const id = parseInt(req.params.id);
    const { name, course, count } = req.body;

    const result = await collection.updateOne({ _id: id }, { $set: { name: name, course: course, count: count } });

    res.send("Student updated successfully");
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).json({ error: "An error occurred" });
  }
});
router.put("/update_subject/:id", async (req, res) => {
  try {
    const db = client.db("lab4_2024");
    const collection = db.collection("subjects");
    const id = parseInt(req.params.id);
    const { name, teacher, type_id } = req.body;

    const result = await collection.updateOne(
      { _id: id },
      { $set: { name: name, teacher: teacher, type_id: type_id } }
    );

    res.send("Student updated successfully");
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).json({ error: "An error occurred" });
  }
});
router.put("/update_subj_type/:id", async (req, res) => {
  try {
    const db = client.db("lab4_2024");
    const collection = db.collection("subj_types");
    const id = parseInt(req.params.id);
    const type = req.body.type;

    const result = await collection.updateOne({ _id: id }, { $set: { type: type } });

    res.send("Student updated successfully");
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).json({ error: "An error occurred" });
  }
});
router.put("/update_grade/:id", async (req, res) => {
  try {
    const db = client.db("lab4_2024");
    const collection = db.collection("grades");
    const id = parseInt(req.params.id);
    const { grade, student_id, subject_id } = req.body;

    const result = await collection.updateOne(
      { _id: id },
      { $set: { grade: grade, student_id: student_id, subject_id: subject_id } }
    );

    res.send("Student updated successfully");
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

// *
// *
// *                         // * DELETE
router.delete("/del_student/:id", async (req, res) => {
  try {
    const db = client.db("lab4_2024");
    const collection = db.collection("students");

    const id = parseInt(req.params.id);

    const result = await collection.deleteOne({ _id: id });

    res.send("Student deleted successfully");
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).json({ error: "An error occurred" });
  }
});
router.delete("/del_group/:id", async (req, res) => {
  try {
    const db = client.db("lab4_2024");
    const collection = db.collection("groups");

    const id = parseInt(req.params.id);

    const result = await collection.deleteOne({ _id: id });

    res.send("Student deleted successfully");
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).json({ error: "An error occurred" });
  }
});
router.delete("/del_subject/:id", async (req, res) => {
  try {
    const db = client.db("lab4_2024");
    const collection = db.collection("subjects");

    const id = parseInt(req.params.id);

    const result = await collection.deleteOne({ _id: id });

    res.send("Student deleted successfully");
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).json({ error: "An error occurred" });
  }
});
router.delete("/del_subj_type/:id", async (req, res) => {
  try {
    const db = client.db("lab4_2024");
    const collection = db.collection("subj_types");

    const id = parseInt(req.params.id);

    const result = await collection.deleteOne({ _id: id });

    res.send("Student deleted successfully");
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).json({ error: "An error occurred" });
  }
});
router.delete("/del_grade/:id", async (req, res) => {
  try {
    const db = client.db("lab4_2024");
    const collection = db.collection("grades");

    const id = parseInt(req.params.id);

    const result = await collection.deleteOne({ _id: id });

    res.send("Student deleted successfully");
  } catch (error) {
    console.error("Error executing query", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

module.exports = router;
