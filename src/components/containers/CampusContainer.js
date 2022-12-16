/*==================================================
CampusContainer.js

The Container component is responsible for stateful logic and data fetching, and
passes data (if any) as props to the corresponding View component.
If needed, it also defines the component's "connect" function.
================================================== */
import Header from './Header';
import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from 'react-router-dom';
import { 
  fetchCampusThunk,
  deleteCampusThunk,
  addStudentThunk,
  editStudentThunk,
  fetchAllStudentsThunk,
 } from "../../store/thunks";
import { CampusView, NewStudentView } from "../views";


class CampusContainer extends Component {
  // Initialize state
  constructor(props){
    super(props);
    this.state = {
      firstname: "", 
      lastname: "",
      email: "",
      imageUrl: "",
      gpa: null,
      campusId: null, 
      redirect: false,
      showExisting: false,
      showNew : false,
      existingId: null,
      otherStudents: [],
    };
  }
  
  // Get the specific campus data from back-end database
  componentDidMount() {
    // Get campus ID from URL (API link)
    this.props.fetchAllStudents();
    this.props.fetchCampus(this.props.match.params.id);
    this.setState({
      campusId: this.props.match.params.id,
      otherStudents: this.props.allStudents
    });
    
  }

  // Negate the state of the toggle target
  handleToggle = event => {
    this.setState({
      [event]: !this.state[event]
    });
  }

  // Capture input data when it is entered
  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit = async event => {
    event.preventDefault();  // Prevent browser reload/refresh after submit.

    let student = {
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        email: this.state.email,
        imageUrl: this.state.imageUrl,
        gpa: this.state.gpa,
        campusId: this.state.campusId
    };
    
    // Add new student in back-end database
    await this.props.addStudent(student);

    // Update state, and trigger redirect to show the new student
    this.setState({
      firstname: "",
      lastname: "",
      email: "",
      imageUrl: "",
      gpa: null,
      campusId: null,
      existingId: null,
      redirect: true,
      showExisting: false,
      showNew : false,
      otherStudents: []
    });
  }

  handleExistingSubmit = async event => {
    event.preventDefault();
    let student = {
      id: event.target[0].value,
      campusId: this.state.campusId
    };
    
    await this.props.editStudent(student);
    this.setState({
      existingId: null,
      redirect: true
    });
  }

  handleExistingDelete = async event => {
    let student = {
      id: event,
      campusId: null,
    };
    
    await this.props.editStudent(student);
    this.setState({
      existingId: null,
      redirect: true
    });
  }

  // Take action after user click the delete button
  handleDelete = async (event) => {
    // Delete campus in back-end database
    await this.props.deleteCampus(this.props.match.params.id);

    // Update state, and trigger redirect to show all campuses
    this.setState({
      redirect: true, 
    });
  }

  // Unmount when the component is being removed from the DOM:
  componentWillUnmount() {
      this.setState({
      firstname: "", 
      lastname: "",
      email: "",
      imageUrl: "",
      gpa: null,
      campusId: null, 
      showExisting: false,
      showNew : false,
      existingId: null,
      redirect: false,
      otherStudents: []
      });
  }

  // Render a Campus view by passing campus data as props to the corresponding View component
  render() {
    // Redirect to all campuses page after delete
    if(this.state.redirect) {
      return (<Redirect to={`/campuses`}/>)
    }
    return (
      <div>
        <Header />
        <CampusView 
          campus={this.props.campus}
          otherStudents={this.state.otherStudents}
          deleteCampus={this.handleDelete}
          showNew={this.state.showNew}
          showExisting={this.state.showExisting}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          handleExistingSubmit={this.handleExistingSubmit}
          handleExistingDelete={this.handleExistingDelete}
          handleToggle={this.handleToggle}
          NewStudentView={NewStudentView}
        />

      </div>
    );
  }
}

// The following 2 input arguments are passed to the "connect" function used by "CampusContainer" component to connect to Redux Store.
// 1. The "mapState" argument specifies the data from Redux Store that the component needs.
// The "mapState" is called when the Store State changes, and it returns a data object of "campus".
const mapState = (state) => {
  return {
    campus: state.campus,  // Get the State object from Reducer "campus"
    allStudents: state.allStudents
  };
};
// 2. The "mapDispatch" argument is used to dispatch Action (Redux Thunk) to Redux Store.
// The "mapDispatch" calls the specific Thunk to dispatch its action. The "dispatch" is a function of Redux Store.
const mapDispatch = (dispatch) => {
  return {
    fetchCampus: (id) => dispatch(fetchCampusThunk(id)),
    deleteCampus: (id) => dispatch(deleteCampusThunk(id)),
    addStudent: (student) => dispatch(addStudentThunk(student)),
    editStudent: (student) => dispatch(editStudentThunk(student)),
    fetchAllStudents: () => dispatch(fetchAllStudentsThunk()),
  };
};

// Export store-connected container by default
// CampusContainer uses "connect" function to connect to Redux Store and to read values from the Store 
// (and re-read the values when the Store State updates).
export default connect(mapState, mapDispatch)(CampusContainer);