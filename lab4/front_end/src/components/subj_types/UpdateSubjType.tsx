import { useEffect, useRef, useState } from "react";
import { getData, updateData } from "../../services/CrudDataService";
import { SubjectType } from "../../interfaces/subj_type.interface";
import { Toast } from "primereact/toast";
import "../../styles/Read.scss";
import "../../styles/Create.scss";

const UpdateSubjType = () => {
  const [data, setData] = useState<SubjectType[]>([]);
  const [currSubjType, setCurrSubjType] = useState<SubjectType>();
  const toast = useRef<Toast | null>(null);

  const showSuccess = () => {
    if (toast.current) {
      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: "Subject Type successful added",
        life: 1500,
      });
    }
  };

  const showError = () => {
    if (toast.current) {
      toast.current.show({ severity: "error", summary: "Error", detail: "Fill all fields!", life: 1500 });
    }
  };

  const fetchDataFromApi = async () => {
    try {
      const result = await getData("subj_types");
      setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const Update = async (id: number) => {
    try {
      if (currSubjType) {
        const result = await updateData("update_subj_type", id, currSubjType);
        console.log("Update subject type:", result);
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
            <th className="sect row">Type</th>
            <th className="sect row"></th>
          </tr>
        </thead>
        <tbody>
          {data.map((subj_type, index) => (
            <tr key={index}>
              <td className="id">{subj_type._id}</td>
              <td className="sect">{subj_type.type}</td>
              <td className="sect">
                <button
                  className="Update"
                  onClick={() => {
                    setCurrSubjType(subj_type);
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
          placeholder="Type"
          value={currSubjType?.type}
          onChange={(e) => setCurrSubjType((prevState) => ({ ...prevState!, type: e.target.value }))}
        />
        <button
          className="btnUpdate"
          onClick={() => {
            if (currSubjType) Update(currSubjType._id);
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

export default UpdateSubjType;
