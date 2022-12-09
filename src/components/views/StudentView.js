import { Link } from "react-router-dom";
/*==================================================
StudentView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display the single student view page.
================================================== */
const StudentView = (props) => {
  const { student } = props;

  // Render a single Student view 
  return (
    <div>
      <img src={student.imageUrl} alt={student.firstname + " " + student.lastname}/>
      <h1>{student.firstname + " " + student.lastname}</h1>
      <p>{student.email}</p>
      <p>GPA: {student.gpa ? student.gpa : "None" }</p>
      { student.campus ?
        <>
          <h2>Campus:</h2>
          <Link to={`/campus/${student.campus.id}`}>
            <h3>{student.campus.name}</h3>
          </Link>
          <p>{student.campus.address}</p>
        </>
        : <h2>No registered campus</h2>
      }

    </div>
  );

};

export default StudentView;
