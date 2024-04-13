import { useEffect, useRef, useState } from "react";
import { delData, getData } from "../../services/CrudDataService";
import { SubjectType } from "../../interfaces/subj_type.interface";
import { Toast } from "primereact/toast";
import "../../styles/Read.scss";

const DeleteSubjType = () => {
  const [data, setData] = useState<SubjectType[]>([]);
  const toast = useRef<Toast | null>(null);

  const show = () => {
    if (toast.current) {
      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: "Subject Type successful deleted",
        life: 1500,
      });
    }
  };

  const Delete = async (id: number) => {
    try {
      delData("del_subj_type", id);
      show();
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        const result = await getData("subj_types");
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
                  onClick={() => {
                    Delete(subj_type._id);
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

export default DeleteSubjType;
