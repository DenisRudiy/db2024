import { Toast } from "primereact/toast";
import { useEffect, useRef, useState } from "react";
import { createData, getData } from "../../services/CrudDataService";
import "../../styles/Create.scss";
import { SubjectType } from "../../interfaces/subj_type.interface";

const CreateSubjType = () => {
  const toast = useRef<Toast | null>(null);
  const [data, setData] = useState<SubjectType[]>([]);

  const [type, setType] = useState("");

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

  const Create = async () => {
    try {
      if (type) {
        const newGroup = {
          _id: data[data.length - 1]._id + 1,
          type: type,
        };
        const result = await createData("new_subj_type", newGroup);
        console.log("New subject type created:", result);
        setType("");
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
      <input type="text" placeholder="Type" value={type} onChange={(e) => setType(e.target.value)} />
      <button onClick={Create} className="btnCreate">
        <img width="25" height="25" src="https://img.icons8.com/ios/50/ffffff/plus--v1.png" alt="plus--v1" />
        Create
      </button>
    </div>
  );
};

export default CreateSubjType;
