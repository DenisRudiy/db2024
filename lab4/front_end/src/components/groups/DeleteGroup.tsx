import { useEffect, useRef, useState } from "react";
import { delData, getData } from "../../services/CrudDataService";
import { Group } from "../../interfaces/group.interface";
import { Toast } from "primereact/toast";
import "../../styles/Read.scss";

const DeleteGroup = () => {
  const [data, setData] = useState<Group[]>([]);
  const toast = useRef<Toast | null>(null);

  const show = () => {
    if (toast.current) {
      toast.current.show({ severity: "success", summary: "Success", detail: "Group successful deleted", life: 1500 });
    }
  };

  const Delete = async (id: number) => {
    try {
      delData("del_group", id);
      show();
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        const result = await getData("groups");
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
                  onClick={() => {
                    Delete(group._id);
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

export default DeleteGroup;
