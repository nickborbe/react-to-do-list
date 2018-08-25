import React, { Component } from 'react'
import { Link, Route } from 'react-router-dom'


import './App.css';
import axios from 'axios';
import AddTask from './addTask';
import EditTask from './editTask'
import User from './user'
import TodoList from './todoList'


class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      loggedInUser: null,
    }
  }


  fetchUser(){
    if( this.state.loggedInUser === null ){  
        axios.get(`http://localhost:5000/api/loggedin`, {withCredentials: true})
        .then((response)=>{
            this.setState({
                theTasks: this.state.theTasks,
                showing: this.state.showing,
                loggedInUser:  response.data,
           }) 
        })
        .catch((err)=>{
            this.setState({
              theTasks: this.state.theTasks,
              showing: this.state.showing,
                loggedInUser:  false,
           }) 
        })
    }
}


    getUserFromUserComponent = (userObj)=>{
      console.log("getting user from user component to app", userObj)
      
      this.setState({loggedInUser: userObj});
      
      console.log(this.state)
  }

 

 

  
   





  render() {
    return (
    <div>

        <nav>
          <Link to="/todolist">To-Do List</Link>
        </nav>

        <div>
          <Route path="/todolist" component={TodoList}/>
        </div>


    </div>
    );
  }
}







export default App;
