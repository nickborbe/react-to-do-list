import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import AddTask from './addTask';


class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      theTasks: [],
    }
  }


  getAllTheTasks(){
    axios.get("http://localhost:5000/api/tasks")
    .then((allTheTasks)=>{
      // console.log(allTheTasks)
      this.setState({theTasks: allTheTasks.data})
    })
    .catch((err)=>{
      console.log(err)
    })
  }

  showTasks(){
    if(this.state.theTasks.length === 0){
      this.getAllTheTasks();
    }

    return (
      this.state.theTasks.reverse().map(function(task, index){
        return(
      <div key={index}>
      <h3>{task.title}</h3>
      <p >{task.description} </p>
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
