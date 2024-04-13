import { Toast } from "primereact/toast";
import { useEffect, useRef, useState } from "react";
import { createData, getData } from "../../services/CrudDataService";
import "../../styles/Create.scss";
import { Grade } from "../../interfaces/grade.interface";

const CreateGrade = () => {
  const toast = useRef<Toast | null>(null);
  const [data, setData] = useState<Grade[]>([]);
  const [studentId, setStudentId] = useState<number | undefined>();
  const [subjectId, setSubjectId] = useState<number | undefined>();
  const [grade, setGrade] = useState<number | undefined>();
  const showSuccess = () => {
    if (toast.current) {
      toast.current.show({ severity: "success", summary: "Success", detail: "Grade successful added", life: 1500 });
    }
  };
  const showError = () => {
    if (toast.current) {
      toast.current.show({ severity: "error", summary: "Error", detail: "Fill all fields!", life: 1500 });
    }
  };
  const fetchDataFromApi = async () => {
    try {
      const result = await getData("grades");
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const Create = async () => {
    try {
      if (studentId && subjectId && grade) {
        const newGrade = {
          _id: data[data.length - 1]._id + 1,
          student_id: studentId,
          subject_id: subjectId,
          grade: grade,
        };
        const result = await createData("new_grade", newGrade);
        console.log("New grade created:", result);
        setStudentId(0);
        setSubjectId(0);
        setGrade(0);
        showSuccess();
        fetchDataFromApi();
      } else {
        showError();
      }
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };
  useEffect(() => {
    fetchDataFromApi();
  });
  return (
    <div className="Create">
      <Toast ref={toast} />
      <input
        type="number"
        placeholder="Student ID"
        value={studentId}
        onChange={(e) => setStudentId(parseInt(e.target.value))}
      />
      <input
        type="number"
        placeholder="Subject ID"
        value={subjectId}
        onChange={(e) => setSubjectId(parseInt(e.target.value))}
      />
      <input type="number" placeholder="Grade" value={grade} onChange={(e) => setGrade(parseInt(e.target.value))} />
      <button onClick={Create} className="btnCreate">
        <img width="25" height="25" src="https://img.icons8.com/ios/50/ffffff/plus--v1.png" alt="plus--v1" />
        Create
      </button>
    </div>
  );
};

export default CreateGrade;
