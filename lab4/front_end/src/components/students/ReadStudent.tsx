import { useEffect, useState } from "react";
import { getData } from "../../services/CrudDataService";
import { Student } from "../../interfaces/student.interface";
import "../../styles/Read.scss";

const ReadStudent = () => {
  const [data, setData] = useState<Student[]>([]);
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
      <table cellSpacing={0} cellPadding={0}>
        <thead>
          <tr>
            <th className="id row">ID</th>
            <th className="sect row">Name</th>
            <th className="sect row">Second name</th>
            <th className="sect row">Age</th>
            <th className="sect row">Group</th>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReadStudent;
