import "./styles/App.scss";
import Read from "./components/Read";

function App() {
  return (
    <div className="App">
      <div className="Title">Students</div>
      <div className="Sidebar">
        <div className="Sidebar_items">
          <button>
            <img width="20" height="20" src="https://img.icons8.com/ios-glyphs/90/user--v1.png" alt="" />
            <p className="Button_data">Students</p>
          </button>
          <button>
            <img width="20" height="20" src="https://img.icons8.com/plumpy/96/people-skin-type-7.png" alt="" />
            <p className="Button_data">Groups</p>
          </button>
          <button>
            <img width="20" height="20" src="https://img.icons8.com/ios-filled/50/elective.png" alt="" />
            <p className="Button_data">Subjects</p>
          </button>
          <button>
            <img width="20" height="20" src="https://img.icons8.com/ios-filled/50/philosophy-book.png" alt="k" />
            <p className="Button_data">Subject Types</p>
          </button>
          <button>
            <img width="20" height="20" src="https://img.icons8.com/ios-glyphs/90/grades.png" alt="" />
            <p className="Button_data">Grades</p>
          </button>
        </div>
      </div>
      <div className="BtnSection">
        <button>
          <img width="25" height="25" src="https://img.icons8.com/ios-glyphs/90/read.png" alt="" />
          <p>Read</p>
        </button>
        <button>
          <img width="25" height="25" src="https://img.icons8.com/ios-glyphs/90/create-new.png" alt="" />
          <p>Create</p>
        </button>
        <button>
          <img width="25" height="25" src="https://img.icons8.com/ios-glyphs/90/available-updates.png" alt="" />
          <p>Update</p>
        </button>
        <button>
          <img width="25" height="25" src="https://img.icons8.com/material-outlined/96/filled-trash.png" alt="" />
          <p>Delete</p>
        </button>
      </div>
      <div className="Data">
        <Read></Read>
      </div>
    </div>
  );
}

export default App;
