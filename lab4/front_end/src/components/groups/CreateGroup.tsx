import { Toast } from "primereact/toast";
import { useEffect, useRef, useState } from "react";
import { createData, getData } from "../../services/CrudDataService";
import { Group } from "../../interfaces/group.interface";
import "../../styles/Create.scss";

const CreateGroup = () => {
  const toast = useRef<Toast | null>(null);
  const [data, setData] = useState<Group[]>([]);

  const [name, setName] = useState("");
  const [course, setCourse] = useState<number | undefined>();
  const [count, setCount] = useState<number | undefined>();

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

  const Create = async () => {
    try {
      if (name && course && count) {
        const newGroup = {
          _id: data[data.length - 1]._id + 1,
          name: name,
          course: course,
          count: count,
        };
        const result = await createData("new_group", newGroup);
        console.log("New group created:", result);
        setName("");
        setCourse(0);
        setCount(0);
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
      <input type="number" placeholder="Course" value={course} onChange={(e) => setCourse(parseInt(e.target.value))} />
      <input type="number" placeholder="Count" value={count} onChange={(e) => setCount(parseInt(e.target.value))} />
      <button onClick={Create} className="btnCreate">
        <img width="25" height="25" src="https://img.icons8.com/ios/50/ffffff/plus--v1.png" alt="plus--v1" />
        Create
      </button>
    </div>
  );
};

export default CreateGroup;
