import { useEffect, useRef, useState } from "react";
import { getData, updateData } from "../../services/CrudDataService";
import { Subject } from "../../interfaces/subject.interface";
import { Toast } from "primereact/toast";
import "../../styles/Read.scss";
import "../../styles/Create.scss";

const UpdateSubject = () => {
  const [data, setData] = useState<Subject[]>([]);
  const [currSubject, setCurrSubject] = useState<Subject>();
  const toast = useRef<Toast | null>(null);

  const showSuccess = () => {
    if (toast.current) {
      toast.current.show({ severity: "success", summary: "Success", detail: "Subject successful added", life: 1500 });
    }
  };

  const showError = () => {
    if (toast.current) {
      toast.current.show({ severity: "error", summary: "Error", detail: "Fill all fields!", life: 1500 });
    }
  };

  const fetchDataFromApi = async () => {
    try {
      const result = await getData("subjects");
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const Update = async (id: number) => {
    try {
      if (currSubject) {
        const result = await updateData("update_subject", id, currSubject);
        console.log("Update subject:", result);
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
            <th className="sect row">Teacher</th>
            <th className="sect row">Type ID</th>
            <th className="sect row"></th>
          </tr>
        </thead>
        <tbody>
          {data.map((subject, index) => (
            <tr key={index}>
              <td className="id">{subject._id}</td>
              <td className="sect">{subject.name}</td>
              <td className="sect">{subject.teacher}</td>
              <td className="sect">{subject.type_id}</td>
              <td className="sect">
                <button
                  className="Update"
                  onClick={() => {
                    setCurrSubject(subject);
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
          value={currSubject?.name}
          onChange={(e) => setCurrSubject((prevState) => ({ ...prevState!, name: e.target.value }))}
        />
        <input
          type="text"
          placeholder="Teacher"
          value={currSubject?.teacher}
          onChange={(e) => setCurrSubject((prevState) => ({ ...prevState!, teacher: e.target.value }))}
        />
        <input
          type="number"
          placeholder="Type ID"
          value={currSubject?.type_id}
          onChange={(e) => setCurrSubject((prevState) => ({ ...prevState!, type_id: parseInt(e.target.value) || 0 }))}
        />
        <button
          className="btnUpdate"
          onClick={() => {
            if (currSubject) Update(currSubject._id);
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

export default UpdateSubject;
