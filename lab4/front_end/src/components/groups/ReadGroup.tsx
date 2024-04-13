import { useEffect, useState } from "react";
import { getData } from "../../services/CrudDataService";
import { Group } from "../../interfaces/group.interface";
import "../../styles/Read.scss";

const ReadGroup = () => {
  const [data, setData] = useState<Group[]>([]);
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
      <table cellSpacing={0} cellPadding={0}>
        <thead>
          <tr>
            <th className="id row">ID</th>
            <th className="sect row">Name</th>
            <th className="sect row">Course</th>
            <th className="sect row">Count</th>
          </tr>
        </thead>
        <tbody>
          {data.map((group, index) => (
            <tr key={index}>
              <td className="id">{group._id}</td>
              <td className="sect">{group.name}</td>
              <td className="sect">{group.course}</td>
              <td className="sect">{group.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReadGroup;
