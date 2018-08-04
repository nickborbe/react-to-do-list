import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import AddTask from './addTask';
import EditTask from './editTask'


class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      theTasks: [],
      showing: false
    }
  }

  getAllTheTasks(){
    axios.get("http://localhost:5000/api/tasks")
    .then((allTheTasks)=>{
      // console.log(allTheTasks)
      this.setState({theTasks: allTheTasks.data, showing: false})
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




  showTasks(){
    if(this.state.theTasks.length === 0){
      this.getAllTheTasks();
    }
    

    return (
      this.state.theTasks.map((task, index) => {
        return(
      <div key={index}>
        <button onClick={()=>{this.deleteTask(task._id)}} style={{float:'right', backgroundColor: 'red', padding: '10px', margin: '0 5px'}}>
          Delete Task
          </button>
        <button onClick={()=>this.toggleEditForm(index)} style={{float:'right', backgroundColor: 'greenyellow', padding: '10px',  margin: '0 5px'}}> 
        Edit This Task 
        </button>
      <h3>{task.title}</h3>
      <p style={{maxWidth: '400px'}} >{task.description} </p>
      {this.renderForm(index, task._id, task.title, task.description)}
      </div>
        ) 
      })
    )
  }


  render() {
    return (
    <div className="App">
    <h1> The Single Greatest To-Do List In The History of Human History</h1>
    
    <div className="add">
    <AddTask blah={()=>this.getAllTheTasks()}></AddTask>
    </div>

      <div className="list">
      <h2> List of Tasks </h2>
        {this.showTasks()}
      </div>


      </div>
    );
  }
}







export default App;
