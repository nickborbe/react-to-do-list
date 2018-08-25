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

      <div id="theBody">

        <nav>
          <Link to="/todolist">To-Do List</Link>
        </nav>

        <div>
          <Route path="/todolist" component={TodoList}/>
        </div>



        </div>

          <div className="footer">
      <ul> 
        <h4>Copyright AF</h4>
        <li> This Page is Beautiful </li>
        <li> This Page is a strong, self-loving individual </li>
        </ul>

        <ul>
      <h4> All Rights Reserved </h4>
      <li> Property of me cause I chill and you don't even know how to chill </li>

      </ul>

      <ul>
        <h4> External Resources </h4>
        <li> Check our the Docs </li>
      </ul>
          </div>


    </div>
    );
  }
}







export default App;
