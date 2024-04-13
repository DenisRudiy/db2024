import { useEffect, useRef, useState } from "react";
import { getData, updateData } from "../../services/CrudDataService";
import { Student } from "../../interfaces/student.interface";
import { Toast } from "primereact/toast";
import "../../styles/Read.scss";
import "../../styles/Create.scss";

const UpdateStudent = () => {
  const [data, setData] = useState<Student[]>([]);
  const [currStudent, setCurrStudent] = useState<Student>();
  const toast = useRef<Toast | null>(null);

  const showSuccess = () => {
    if (toast.current) {
      toast.current.show({ severity: "success", summary: "Success", detail: "Student successful added", life: 1500 });
    }
  };

  const showError = () => {
    if (toast.current) {
      toast.current.show({ severity: "error", summary: "Error", detail: "Fill all fields!", life: 1500 });
    }
  };

  const fetchDataFromApi = async () => {
    try {
      const result = await getData("students");
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const Update = async (id: number) => {
    try {
      if (currStudent) {
        const result = await updateData("update_student", id, currStudent);
        console.log("Update student:", result);
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
            <th className="sect row">Name</th>
            <th className="sect row">Second name</th>
            <th className="sect row">Age</th>
            <th className="sect row">Group</th>
            <th className="sect row"></th>
          </tr>
        </thead>
        <tbody>
          {data.map((student, index) => (
            <tr key={index}>
              <td className="id">{student._id}</td>
              <td className="sect">{student.name}</td>
              <td className="sect">{student.second_name}</td>
              <td className="sect">{student.age}</td>
              <td className="sect">{student.group_id}</td>
              <td className="sect">
                <button
                  className="Update"
                  onClick={() => {
                    setCurrStudent(student);
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
          value={currStudent?.name}
          onChange={(e) => setCurrStudent((prevState) => ({ ...prevState!, name: e.target.value }))}
        />
        <input
          type="text"
          placeholder="Second name"
          value={currStudent?.second_name}
          onChange={(e) => setCurrStudent((prevState) => ({ ...prevState!, second_name: e.target.value }))}
        />
        <input
          type="number"
          placeholder="Age"
          value={currStudent?.age}
          onChange={(e) => setCurrStudent((prevState) => ({ ...prevState!, age: parseInt(e.target.value) || 0 }))}
        />
        <input
          type="number"
          placeholder="Group ID"
          value={currStudent?.group_id}
          onChange={(e) => setCurrStudent((prevState) => ({ ...prevState!, group_id: parseInt(e.target.value) || 0 }))}
        />
        <button
          className="btnUpdate"
          onClick={() => {
            if (currStudent) Update(currStudent._id);
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

export default UpdateStudent;
