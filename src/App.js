import React, { Component } from 'react'
import { Link, Route } from 'react-router-dom'


import './App.css';
import axios from 'axios';
import TodoList from './todoList'


class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      loggedInUser: null,
    }
    console.log('re rendering APP JS')
    console.log(this.state)

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
      
      this.setState({loggedInUser: userObj});

  }

  showUser(){
    if(this.state.loggedInUser){
      return(
        <span> Welcome, {this.state.loggedInUser.username} </span>
      )
    }
  }

 


  render() {
    return (
    <div>

      <div id="theBody">

        <nav>
          <Link to="/">Home</Link>
          {this.showUser()}
          <Link to="/todolist">To-Do List</Link>
        </nav>

        <div>
          <Route path="/todolist" render={()=> <TodoList sendTheUser={this.getUserFromUserComponent} theActualUser={this.state.loggedInUser}/>} />
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
      <li> Property of me cause I chill and you don't even know what chilling even is.  Do you? No! Didn't think so. </li>

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
