/*==================================================
CampusView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display a single campus and its students (if any).
================================================== */
import { Link } from "react-router-dom";

// Take in props data to construct the component
const CampusView = (props) => {
  const {campus, deleteCampus} = props;
  let showNew = props.showNew || null;
  let showExisting = props.showExisting || null;
  const handleChange = props.handleChange || null;
  const handleSubmit = props.handleSubmit || null;
  const handleExistingSubmit = props.handleExistingSubmit || null;
  const handleExistingDelete = props.handleExistingDelete || null;
  const handleToggle = props.handleToggle || null;
  const NewStudentView = props.NewStudentView || null;
  const otherStudents = props.otherStudents || null;
  let existingId = 0;

  // Render a single Campus view with list of its students
  return (
    <div>
      <h1>{campus.name}</h1>
      <img src={campus.imageUrl} alt={campus.name}/>
      <p>{campus.address}</p>
      <p>{campus.description}</p>
      {campus.students.length > 0 ? campus.students.map( student => {
        let name = student.firstname + " " + student.lastname;
        return (
          <div key={student.id}>
          <br/>
            <Link to={`/student/${student.id}`}>
              <h2>{name}</h2>
            </Link>
              <img src={student.imageUrl} alt={name}/>
              <br/>
              <p><strong><u>Name:</u></strong> {student.firstname} {student.lastname}</p>
              <p><strong><u>Email:</u></strong> {student.email}</p>
              {student.gpa
              ? <p><strong><u>GPA:</u></strong> {student.gpa}</p>
              : <p><strong><u>GPA:</u></strong> N/A</p>
              }
            <button onClick={() => handleExistingDelete(student.id)}>Remove Student</button>
            <br/>
            <br/>
          </div>
        );
      })
      : <h2>No students enrolled</h2>}
      <br/>
      <br/>
      <h1>Manage Students</h1>
      <br/>
      <button onClick={(e) => handleToggle("showNew")}>Add New Student</button>
      { showNew
        ? 
          <NewStudentView 
            defaultCampusId={campus.id}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
          />
        : null
      }
      <button onClick={() => handleToggle("showExisting")}>Add Existing Student</button>
      { showExisting
        ? 
        <div>
          <div>
              <p>Add an existing Student</p>
          <form style={{textAlign: 'center'}} onSubmit={(e) => handleExistingSubmit(e)}>
            <label style= {{color:'#11153e', fontWeight: 'bold'}}>Student: </label>
            
            <select defaultValue={existingId} onChange={(e) => existingId = e.target.value}>
            {
              otherStudents.map(student => {
                return(<option key={student.id} value={student.id}>{student.firstname} {student.lastname}</option>);
              })
            }
            </select>
            <br/>
            <br/>

            <button type="submit">
              Submit
            </button>
            <br/>
            <br/>
          </form>
          </div>
        </div>
        : null
      }
      
      <br/><br/>
      <Link to={`/campus/${campus.id}/editcampus`}>
          <button>Edit Campus</button>
      </Link>
      <button onClick={() => deleteCampus(campus.id)}>Delete campus</button>
      <br/><br/>
      <br/><br/>
    </div>
  );
};

export default CampusView;
