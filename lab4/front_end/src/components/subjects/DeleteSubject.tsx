import { useEffect, useRef, useState } from "react";
import { delData, getData } from "../../services/CrudDataService";
import { Subject } from "../../interfaces/subject.interface";
import { Toast } from "primereact/toast";
import "../../styles/Read.scss";

const DeleteSubject = () => {
  const [data, setData] = useState<Subject[]>([]);
  const toast = useRef<Toast | null>(null);

  const show = () => {
    if (toast.current) {
      toast.current.show({ severity: "success", summary: "Success", detail: "Subject successful deleted", life: 1500 });
    }
  };

  const Delete = async (id: number) => {
    try {
      delData("del_subject", id);
      show();
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        const result = await getData("subjects");
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
                  onClick={() => {
                    Delete(subject._id);
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

export default DeleteSubject;
