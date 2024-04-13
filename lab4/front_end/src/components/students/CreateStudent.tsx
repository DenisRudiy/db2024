import { Toast } from "primereact/toast";
import { useEffect, useRef, useState } from "react";
import { createData, getData } from "../../services/CrudDataService";
import { Student } from "../../interfaces/student.interface";
import "../../styles/Create.scss";

const CreateStudent = () => {
  const toast = useRef<Toast | null>(null);
  const [data, setData] = useState<Student[]>([]);

  const [name, setName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [age, setAge] = useState<number | undefined>();
  const [groupId, setGroupId] = useState<number | undefined>();

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

  const Create = async () => {
    try {
      if (name && secondName && age && groupId) {
        const newStudent = {
          _id: data[data.length - 1]._id + 1,
          name: name,
          second_name: secondName,
          age: age,
          group_id: groupId,
        };
        const result = await createData("new_student", newStudent);
        console.log("New student created:", result);
        setName("");
        setSecondName("");
        setAge(0);
        setGroupId(0);
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
      <input type="text" placeholder="Second name" value={secondName} onChange={(e) => setSecondName(e.target.value)} />
      <input type="number" placeholder="Age" value={age} onChange={(e) => setAge(parseInt(e.target.value))} />
      <input
        type="number"
        placeholder="Group ID"
        value={groupId}
        onChange={(e) => setGroupId(parseInt(e.target.value))}
      />
      <button onClick={Create} className="btnCreate">
        <img width="25" height="25" src="https://img.icons8.com/ios/50/ffffff/plus--v1.png" alt="plus--v1" />
        Create
      </button>
    </div>
  );
};

export default CreateStudent;
