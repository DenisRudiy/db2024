import { useEffect, useRef, useState } from "react";
import { delData, getData } from "../../services/CrudDataService";
import { Grade } from "../../interfaces/grade.interface";
import { Toast } from "primereact/toast";
import "../../styles/Read.scss";

const DeleteGrade = () => {
  const [data, setData] = useState<Grade[]>([]);
  const toast = useRef<Toast | null>(null);

  const show = () => {
    if (toast.current) {
      toast.current.show({ severity: "success", summary: "Success", detail: "Grade successful deleted", life: 1500 });
    }
  };

  const Delete = async (id: number) => {
    try {
      delData("del_grade", id);
      show();
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        const result = await getData("grades");
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
                  onClick={() => {
                    Delete(grade._id);
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

export default DeleteGrade;
