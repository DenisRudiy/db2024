import "./styles/App.scss";
import { useEffect, useState } from "react";
import ReadStudent from "./components/students/ReadStudent";
import CreateStudent from "./components/students/CreateStudent";
import UpdateStudent from "./components/students/UpdateStudent";
import DeleteStudent from "./components/students/DeleteStudent";
import ReadGroup from "./components/groups/ReadGroup";
import ReadSubject from "./components/subjects/ReadSubject";
import ReadSubjType from "./components/subj_types/ReadSubjType";
import ReadGrade from "./components/grades/ReadGrade";

function App() {
  const [type, setType] = useState("Students");
  const [action, setAction] = useState("Read");

  useEffect(() => {
    console.log(type, action);
    console.log(type === "Student");
  }, [type, action]);

  return (
    <div className="App">
      <div className="Title">{type}</div>
      <div className="Sidebar">
        <div className="Sidebar_items">
          <button
            onClick={() => {
              setType("Students");
            }}
          >
            <img width="20" height="20" src="https://img.icons8.com/ios-glyphs/90/user--v1.png" alt="" />
            <p className="Button_data">Students</p>
          </button>
          <button
            onClick={() => {
              setType("Groups");
            }}
          >
            <img width="20" height="20" src="https://img.icons8.com/plumpy/96/people-skin-type-7.png" alt="" />
            <p className="Button_data">Groups</p>
          </button>
          <button
            onClick={() => {
              setType("Subjects");
            }}
          >
            <img width="20" height="20" src="https://img.icons8.com/ios-filled/50/elective.png" alt="" />
            <p className="Button_data">Subjects</p>
          </button>
          <button
            onClick={() => {
              setType("Subject Types");
            }}
          >
            <img width="20" height="20" src="https://img.icons8.com/ios-filled/50/philosophy-book.png" alt="k" />
            <p className="Button_data">Subject Types</p>
          </button>
          <button
            onClick={() => {
              setType("Grades");
            }}
          >
            <img width="20" height="20" src="https://img.icons8.com/ios-glyphs/90/grades.png" alt="" />
            <p className="Button_data">Grades</p>
          </button>
        </div>
      </div>
      <div className="BtnSection">
        <button
          onClick={() => {
            setAction("Read");
          }}
        >
          <img width="25" height="25" src="https://img.icons8.com/ios-glyphs/90/read.png" alt="" />
          <p>Read</p>
        </button>
        <button
          onClick={() => {
            setAction("Create");
          }}
        >
          <img width="25" height="25" src="https://img.icons8.com/ios-glyphs/90/create-new.png" alt="" />
          <p>Create</p>
        </button>
        <button
          onClick={() => {
            setAction("Update");
          }}
        >
          <img width="25" height="25" src="https://img.icons8.com/ios-glyphs/90/available-updates.png" alt="" />
          <p>Update</p>
        </button>
        <button
          onClick={() => {
            setAction("Delete");
          }}
        >
          <img width="25" height="25" src="https://img.icons8.com/material-outlined/96/filled-trash.png" alt="" />
          <p>Delete</p>
        </button>
      </div>
      <div className="Data">
        {type === "Students" ? (
          <>
            {action === "Read" ? <ReadStudent></ReadStudent> : <></>}
            {action === "Create" ? <CreateStudent></CreateStudent> : <></>}
            {action === "Update" ? <UpdateStudent></UpdateStudent> : <></>}
            {action === "Delete" ? <DeleteStudent></DeleteStudent> : <></>}
          </>
        ) : (
          <></>
        )}
        {type === "Groups" ? (
          <>
            {action === "Read" ? <ReadGroup></ReadGroup> : <></>}
            {action === "Create" ? <CreateStudent></CreateStudent> : <></>}
            {action === "Update" ? <UpdateStudent></UpdateStudent> : <></>}
            {action === "Delete" ? <DeleteStudent></DeleteStudent> : <></>}
          </>
        ) : (
          <></>
        )}
        {type === "Subjects" ? (
          <>
            {action === "Read" ? <ReadSubject></ReadSubject> : <></>}
            {action === "Create" ? <CreateStudent></CreateStudent> : <></>}
            {action === "Update" ? <UpdateStudent></UpdateStudent> : <></>}
            {action === "Delete" ? <DeleteStudent></DeleteStudent> : <></>}
          </>
        ) : (
          <></>
        )}
        {type === "Subject Types" ? (
          <>
            {action === "Read" ? <ReadSubjType></ReadSubjType> : <></>}
            {action === "Create" ? <CreateStudent></CreateStudent> : <></>}
            {action === "Update" ? <UpdateStudent></UpdateStudent> : <></>}
            {action === "Delete" ? <DeleteStudent></DeleteStudent> : <></>}
          </>
        ) : (
          <></>
        )}
        {type === "Grades" ? (
          <>
            {action === "Read" ? <ReadGrade></ReadGrade> : <></>}
            {action === "Create" ? <CreateStudent></CreateStudent> : <></>}
            {action === "Update" ? <UpdateStudent></UpdateStudent> : <></>}
            {action === "Delete" ? <DeleteStudent></DeleteStudent> : <></>}
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default App;
