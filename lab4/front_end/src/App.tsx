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
import CreateGroup from "./components/groups/CreateGroup";
import DeleteGroup from "./components/groups/DeleteGroup";
import UpdateGroup from "./components/groups/UpdateGroup";
import DeleteSubject from "./components/subjects/DeleteSubject";
import CreateSubject from "./components/subjects/CreateSubject";
import UpdateSubject from "./components/subjects/UpdateSubject";
import DeleteSubjType from "./components/subj_types/DeleteSubjType";
import CreateSubjType from "./components/subj_types/CreateSubjType";
import UpdateSubjType from "./components/subj_types/UpdateSubjType";
import DeleteGrade from "./components/grades/DeleteGrade";
import CreateGrade from "./components/grades/CreateGrade";
import UpdateGrade from "./components/grades/UpdateGrade";

function App() {
  const [type, setType] = useState("Students");
  const [action, setAction] = useState("Read");

  useEffect(() => {}, [type, action]);

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
            {action === "Create" ? <CreateGroup></CreateGroup> : <></>}
            {action === "Update" ? <UpdateGroup></UpdateGroup> : <></>}
            {action === "Delete" ? <DeleteGroup></DeleteGroup> : <></>}
          </>
        ) : (
          <></>
        )}
        {type === "Subjects" ? (
          <>
            {action === "Read" ? <ReadSubject></ReadSubject> : <></>}
            {action === "Create" ? <CreateSubject></CreateSubject> : <></>}
            {action === "Update" ? <UpdateSubject></UpdateSubject> : <></>}
            {action === "Delete" ? <DeleteSubject></DeleteSubject> : <></>}
          </>
        ) : (
          <></>
        )}
        {type === "Subject Types" ? (
          <>
            {action === "Read" ? <ReadSubjType></ReadSubjType> : <></>}
            {action === "Create" ? <CreateSubjType></CreateSubjType> : <></>}
            {action === "Update" ? <UpdateSubjType></UpdateSubjType> : <></>}
            {action === "Delete" ? <DeleteSubjType></DeleteSubjType> : <></>}
          </>
        ) : (
          <></>
        )}
        {type === "Grades" ? (
          <>
            {action === "Read" ? <ReadGrade></ReadGrade> : <></>}
            {action === "Create" ? <CreateGrade></CreateGrade> : <></>}
            {action === "Update" ? <UpdateGrade></UpdateGrade> : <></>}
            {action === "Delete" ? <DeleteGrade></DeleteGrade> : <></>}
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default App;
