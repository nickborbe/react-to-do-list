import React, { Component } from 'react';
import './App.css';
import axios from 'axios';
import AddTask from './addTask';
import EditTask from './editTask'
import User from './user'


class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      theTasks: null,
      showing: false,
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

  getAllTheTasks(){
    axios.get("http://localhost:5000/api/tasks", {withCredentials: true})
    .then((allTheTasks)=>{
      this.setState({theTasks: allTheTasks.data, showing: false, loggedInUser: this.state.loggedInUser})
    })
    .catch((err)=>{
      console.log(err)
    })
  }


  toggleEditForm(whichTask){
    if(this.state.showing === whichTask){
      this.setState({theTasks: this.state.theTasks, showing: false});
    } else{
      this.setState({theTasks: this.state.theTasks, showing: whichTask});
    }
  }

  renderForm(theIndex, theTaskID, theTitle, theDesc){
    if(this.state.showing === theIndex){
        return(
          <EditTask blah={()=>this.getAllTheTasks()} taskProp={theTaskID} title={theTitle} desc={theDesc}></EditTask>
      )
    }
  }

    deleteTask(theIdOfTheTask){
      axios.post(`http://localhost:5000/api/tasks/delete/${theIdOfTheTask}`, {}, {withCredentials: true})
      .then((response)=>{
        console.log(response);
        this.getAllTheTasks();
      })
      .catch((err)=>{
        console.log(err)
      })
    }

    seeIfTaskBelongsToUser(task, index){
      if(this.state.loggedInUser && task.owner == this.state.loggedInUser._id){
        return (
          <div>
          <button onClick={()=>{this.deleteTask(task._id)}} style={{float:'right', backgroundColor: 'red', padding: '10px', margin: '0 5px'}}>
          Delete Task
          </button>
        <button onClick={()=>this.toggleEditForm(index)} style={{float:'right', backgroundColor: 'greenyellow', padding: '10px',  margin: '0 5px'}}> 
        Edit This Task 
        </button>
        </div>
        )
      } 
    }



  showTasks(){
    if(this.state.theTasks === null){
      this.getAllTheTasks();
    }

    if(this.state.theTasks){

      return (
        this.state.theTasks.map((task, index) => {
          return(
        <div key={index}>
          {this.seeIfTaskBelongsToUser(task, index)}
        <h3>{task.title}</h3>
        <p style={{maxWidth: '400px'}} >{task.description} </p>
        {this.renderForm(index, task._id, task.title, task.description)}

      
        </div>
          ) 
        })
      )
    } // closes the if statement
  }


  render() {
    return (
      <div className="App">
      {this.fetchUser()}
    <h1 style={{margin: '80px'}}> The Single Greatest To-Do List In The History of Human History</h1>
    
    <div className="add">
    <AddTask blah={()=>this.getAllTheTasks()}></AddTask>

    <User sendIt={this.getUserFromUserComponent}></User>

    </div>

      <div className="list">
      <h2> List of Tasks </h2>
        {this.showTasks()}
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
