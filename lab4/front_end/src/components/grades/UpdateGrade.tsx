import { useEffect, useRef, useState } from "react";
import { getData, updateData } from "../../services/CrudDataService";
import { Grade } from "../../interfaces/grade.interface";
import { Toast } from "primereact/toast";
import "../../styles/Read.scss";
import "../../styles/Create.scss";

const UpdateGrade = () => {
  const [data, setData] = useState<Grade[]>([]);
  const [currGrade, setCurrGrade] = useState<Grade>();
  const toast = useRef<Toast | null>(null);

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

  const Update = async (id: number) => {
    try {
      if (currGrade) {
        const result = await updateData("update_grade", id, currGrade);
        console.log("Update grade:", result);
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
    <div className="Read">
      <Toast ref={toast} />
      <table cellSpacing={0} cellPadding={0}>
        <thead>
          <tr>
            <th className="id row">ID</th>
            <th className="sect row">Student ID</th>
            <th className="sect row">Subject ID</th>
            <th className="sect row">Grade</th>
            <th className="sect row"></th>
          </tr>
        </thead>
        <tbody>
          {data.map((grade, index) => (
            <tr key={index}>
              <td className="id">{grade._id}</td>
              <td className="sect">{grade.student_id}</td>
              <td className="sect">{grade.subject_id}</td>
              <td className="sect">{grade.grade}</td>
              <td className="sect">
                <button
                  className="Update"
                  onClick={() => {
                    setCurrGrade(grade);
                  }}
                >
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="UpdateForm">
        <input
          type="text"
          placeholder="Name"
          value={currGrade?.student_id}
          onChange={(e) => setCurrGrade((prevState) => ({ ...prevState!, student_id: parseInt(e.target.value) || 0 }))}
        />
        <input
          type="number"
          placeholder="Course"
          value={currGrade?.subject_id}
          onChange={(e) => setCurrGrade((prevState) => ({ ...prevState!, subject_id: parseInt(e.target.value) || 0 }))}
        />
        <input
          type="number"
          placeholder="Count"
          value={currGrade?.grade}
          onChange={(e) => setCurrGrade((prevState) => ({ ...prevState!, grade: parseInt(e.target.value) || 0 }))}
        />
        <button
          className="btnUpdate"
          onClick={() => {
            if (currGrade) Update(currGrade._id);
            else showError();
          }}
        >
          <img
            width="25"
            height="25"
            src="https://img.icons8.com/material-outlined/24/ffffff/available-updates.png"
            alt="available-updates"
          />
          Update
        </button>
      </div>
    </div>
  );
};

export default UpdateGrade;
