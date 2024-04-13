import { Toast } from "primereact/toast";
import { useEffect, useRef, useState } from "react";
import { createData, getData } from "../../services/CrudDataService";
import { Subject } from "../../interfaces/subject.interface";
import "../../styles/Create.scss";

const CreateSubject = () => {
  const toast = useRef<Toast | null>(null);
  const [data, setData] = useState<Subject[]>([]);

  const [name, setName] = useState("");
  const [teacher, setTeacher] = useState("");
  const [typeId, setTypeId] = useState<number | undefined>();

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

  const Create = async () => {
    try {
      if (name && teacher && typeId) {
        const newSubject = {
          _id: data[data.length - 1]._id + 1,
          name: name,
          teacher: teacher,
          type_id: typeId,
        };
        const result = await createData("new_subject", newSubject);
        console.log("New subject created:", result);
        setName("");
        setTeacher("");
        setTypeId(0);
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
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="text" placeholder="Teacher" value={teacher} onChange={(e) => setTeacher(e.target.value)} />
      <input type="number" placeholder="Type ID" value={typeId} onChange={(e) => setTypeId(parseInt(e.target.value))} />
      <button onClick={Create} className="btnCreate">
        <img width="25" height="25" src="https://img.icons8.com/ios/50/ffffff/plus--v1.png" alt="plus--v1" />
        Create
      </button>
    </div>
  );
};

export default CreateSubject;
