import { useEffect, useRef, useState } from "react";
import { getData, updateData } from "../../services/CrudDataService";
import { Group } from "../../interfaces/group.interface";
import { Toast } from "primereact/toast";
import "../../styles/Read.scss";
import "../../styles/Create.scss";

const UpdateGroup = () => {
  const [data, setData] = useState<Group[]>([]);
  const [currGroup, setCurrGroup] = useState<Group>();
  const toast = useRef<Toast | null>(null);

  const showSuccess = () => {
    if (toast.current) {
      toast.current.show({ severity: "success", summary: "Success", detail: "Group successful added", life: 1500 });
    }
  };

  const showError = () => {
    if (toast.current) {
      toast.current.show({ severity: "error", summary: "Error", detail: "Fill all fields!", life: 1500 });
    }
  };

  const fetchDataFromApi = async () => {
    try {
      const result = await getData("groups");
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const Update = async (id: number) => {
    try {
      if (currGroup) {
        const result = await updateData("update_group", id, currGroup);
        console.log("Update group:", result);
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
            <th className="sect row">Course</th>
            <th className="sect row">Count</th>
            <th className="sect row"></th>
          </tr>
        </thead>
        <tbody>
          {data.map((group, index) => (
            <tr key={index}>
              <td className="id">{group._id}</td>
              <td className="sect">{group.name}</td>
              <td className="sect">{group.course}</td>
              <td className="sect">{group.count}</td>
              <td className="sect">
                <button
                  className="Update"
                  onClick={() => {
                    setCurrGroup(group);
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
          value={currGroup?.name}
          onChange={(e) => setCurrGroup((prevState) => ({ ...prevState!, name: e.target.value }))}
        />
        <input
          type="number"
          placeholder="Course"
          value={currGroup?.course}
          onChange={(e) => setCurrGroup((prevState) => ({ ...prevState!, course: parseInt(e.target.value) || 0 }))}
        />
        <input
          type="number"
          placeholder="Count"
          value={currGroup?.count}
          onChange={(e) => setCurrGroup((prevState) => ({ ...prevState!, count: parseInt(e.target.value) || 0 }))}
        />
        <button
          className="btnUpdate"
          onClick={() => {
            if (currGroup) Update(currGroup._id);
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

export default UpdateGroup;
