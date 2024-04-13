import { useEffect, useState } from "react";
import { getData } from "../../services/CrudDataService";
import { SubjectType } from "../../interfaces/subj_type.interface";
import "../../styles/Read.scss";

const ReadSubjType = () => {
  const [data, setData] = useState<SubjectType[]>([]);
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
      <table cellSpacing={0} cellPadding={0}>
        <thead>
          <tr>
            <th className="id row">ID</th>
            <th className="sect row">Type</th>
          </tr>
        </thead>
        <tbody>
          {data.map((subj_type, index) => (
            <tr key={index}>
              <td className="id">{subj_type._id}</td>
              <td className="sect">{subj_type.type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReadSubjType;
