import { useEffect, useRef, useState } from "react";
import { delData, getData } from "../../services/CrudDataService";
import { Student } from "../../interfaces/student.interface";
import { Toast } from "primereact/toast";
import "../../styles/Read.scss";

const DeleteStudent = () => {
  const [data, setData] = useState<Student[]>([]);
  const toast = useRef<Toast | null>(null);

  const show = () => {
    if (toast.current) {
      toast.current.show({ severity: "success", summary: "Success", detail: "Student successful deleted", life: 1500 });
    }
  };

  const Delete = async (id: number) => {
    try {
      delData("del_student", id);
      show();
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        const result = await getData("students");
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
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
                  onClick={() => {
                    Delete(student._id);
                  }}
                  className="Delete"
                >
                  <img
                    width="15"
                    height="15"
                    src="https://img.icons8.com/ios-glyphs/90/ffffff/filled-trash.png"
                    alt="filled-trash"
                  />
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DeleteStudent;
