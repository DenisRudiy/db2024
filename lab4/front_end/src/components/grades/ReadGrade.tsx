import { useEffect, useState } from "react";
import { getData } from "../../services/CrudDataService";
import { Grade } from "../../interfaces/grade.interface";
import "../../styles/Read.scss";

const ReadGrade = () => {
  const [data, setData] = useState<Grade[]>([]);
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
      <table cellSpacing={0} cellPadding={0}>
        <thead>
          <tr>
            <th className="id row">ID</th>
            <th className="sect row">Student ID</th>
            <th className="sect row">Subject ID</th>
            <th className="sect row">Grade</th>
          </tr>
        </thead>
        <tbody>
          {data.map((grade, index) => (
            <tr key={index}>
              <td className="id">{grade._id}</td>
              <td className="sect">{grade.student_id}</td>
              <td className="sect">{grade.subject_id}</td>
              <td className="sect">{grade.grade}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReadGrade;
