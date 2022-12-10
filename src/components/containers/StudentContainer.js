/*==================================================
StudentContainer.js

The Container component is responsible for stateful logic and data fetching, and
passes data (if any) as props to the corresponding View component.
If needed, it also defines the component's "connect" function.
================================================== */
import Header from './Header';
import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';
import { 
  fetchStudentThunk,
  deleteStudentThunk,
 } from "../../store/thunks";
import { StudentView } from "../views";

class StudentContainer extends Component {
  // Initialize state
  constructor(props){
    super(props);
    this.state = {
      redirect: false, 
    };
  }
  
  // Get student data from back-end database
  componentDidMount() {
    // Get student ID from url
    this.props.fetchStudent(this.props.match.params.id);
  }

  // Take action after user click the delete button
  handleDelete = async event => {
    // Delete student in back-end database
    await this.props.deleteStudent(this.props.match.params.id);

    // Update state, and trigger redirect to show all students
    this.setState({
      redirect: true, 
    });
  }

  // Unmount when the component is being removed from the DOM:
  componentWillUnmount() {
      this.setState({redirect: false});
  }

  // Render Student view by passing student data as props to the corresponding View component
  render() {
    // Redirect to all students page after delete
    if(this.state.redirect) {
      return (<Redirect to={`/students`}/>)
    }
    return (
      <div>
        <Header />
        <StudentView 
          student={this.props.student}
          deleteStudent={this.handleDelete} 
        />
      </div>
    );
  }
}

// The following 2 input arguments are passed to the "connect" function used by "StudentContainer" to connect to Redux Store.  
// The following 2 input arguments are passed to the "connect" function used by "AllCampusesContainer" component to connect to Redux Store.
const mapState = (state) => {
  return {
    student: state.student,  // Get the State object from Reducer "student"
  };
};
// 2. The "mapDispatch" argument is used to dispatch Action (Redux Thunk) to Redux Store.
// The "mapDispatch" calls the specific Thunk to dispatch its action. The "dispatch" is a function of Redux Store.
const mapDispatch = (dispatch) => {
  return {
    fetchStudent: (id) => dispatch(fetchStudentThunk(id)),
    deleteStudent: (id) => dispatch(deleteStudentThunk(id)),
  };
};

// Export store-connected container by default
// StudentContainer uses "connect" function to connect to Redux Store and to read values from the Store 
// (and re-read the values when the Store State updates).
export default connect(mapState, mapDispatch)(StudentContainer);