/*==================================================
AllCampusesView.js

The Views component is responsible for rendering web page with data provided by the corresponding Container component.
It constructs a React component to display all campuses.
================================================== */
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const AllCampusesView = (props) => {
  const {allCampuses, deleteCampus} = props;
  // If there is no campus, display a message.
  if (!allCampuses.length) {
    return (
      <div>
        <p>There are no campuses.</p>
        <Link to={`newcampus`}>
        <button>Add New Campus</button>
      </Link>
      </div>
    );
  }

  // If there is at least one campus, render All Campuses view 
  return (
    <div>
      <h1>All Campuses</h1>

      {allCampuses.sort((a,b) => a.id > b.id ? 1 : -1).map((campus) => (
        <div key={campus.id}>
          <Link to={`/campus/${campus.id}`}>
            <h2>{campus.name}</h2>
          </Link>
          <h4>campus id: {campus.id}</h4>
          <img src={campus.imageUrl} alt={`${campus.name}`} />
          <p>{campus.address}</p>
          <p>{campus.description}</p>
          <p>Enrolled students: {campus.students ? campus.students.length : 0}</p>
          { campus.students && campus.students.length > 0 ?
          <div>
          <br/>
            <h2><u>Students:</u></h2> {
              campus.students.map((student) => (
                <div key={`${campus.id}_${student.id}`}>
                <br/>
                <p><strong><u>Name:</u></strong> {student.firstname} {student.lastname}</p>
                <p><strong><u>Email:</u></strong> {student.email}</p>
                {student.gpa
                ? <p><strong><u>GPA:</u></strong> {student.gpa}</p>
                : <p><strong><u>GPA:</u></strong> N/A</p>
                }
                </div>
              ))
            }
          </div>
          : null }
          <br/>
          <br/>
          <Link to={`/campus/${campus.id}/editcampus`}>
            <button>Edit Campus</button>
          </Link>
          <br/>
          <button onClick={() => deleteCampus(campus.id)}>Delete</button>
          <br/><br/>
          <hr/>
        </div>
      ))}
      <br/>
      <Link to={`/newcampus`}>
        <button>Add New Campus</button>
      </Link>
      <br/><br/>
    </div>
  );
};

// Validate data type of the props passed to component.
AllCampusesView.propTypes = {
  allCampuses: PropTypes.array.isRequired,
};

export default AllCampusesView;
