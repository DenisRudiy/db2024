import { useEffect, useState } from "react";
import { getData } from "../../services/CrudDataService";
import { Subject } from "../../interfaces/subject.interface";
import "../../styles/Read.scss";

const ReadSubject = () => {
  const [data, setData] = useState<Subject[]>([]);
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
      <table cellSpacing={0} cellPadding={0}>
        <thead>
          <tr>
            <th className="id row">ID</th>
            <th className="sect row">Name</th>
            <th className="sect row">Teacher</th>
            <th className="sect row">Type ID</th>
          </tr>
        </thead>
        <tbody>
          {data.map((subject, index) => (
            <tr key={index}>
              <td className="id">{subject._id}</td>
              <td className="sect">{subject.name}</td>
              <td className="sect">{subject.teacher}</td>
              <td className="sect">{subject.type_id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReadSubject;
