import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';


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
     <h1> The Single Greates To-Do List In The History of Human History</h1>
     <button onClick={()=>{this.getAllTheTasks()}} >
       Get Tasks
       </button>
       {this.showTasks()}
      </div>
    );
  }
}

export default App;
