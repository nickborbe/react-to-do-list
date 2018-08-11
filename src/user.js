import React, { Component } from 'react';
import axios from 'axios';


class User extends Component {
    constructor(props){
        super(props)
        this.state = {
            usernameInput: '',
            passwordInput: '',
            loggedInUser: null,
        }
    }
    updatePassword(e){
        this.setState({
            usernameInput: this.state.usernameInput,
            passwordInput: e.target.value,
        })
       
 
    }
    updateUsername(e){
            this.setState({
                usernameInput: e.target.value,
                passwordInput: this.state.passwordInput,
            })
    }

    login(){
        const username = this.state.usernameInput;
        const password = this.state.passwordInput;
        axios.post(`http://localhost:5000/api/login`, {username, password }, {withCredentials: true})
        .then((response)=>{
            this.setState({
                usernameInput: this.state.usernameInput,
                passwordInput: this.state.passwordInput,
                loggedInUser:  response.data,
            })
           
        })

    }

    showUser(){
       return this.state.loggedInUser? `Welcome, ${this.state.loggedInUser.username}` : 'User Component'
    }

    render(){
        return(
            <div>
            <h3> {this.showUser()} </h3>
            {/* <div>username here</div> */}
            <label> Username </label>
            <input value = {this.state.usernameInput} onChange={(e)=>{this.updateUsername(e)}} type="text"/>
            <label> Password </label>
            <input value = {this.state.passwordInput} onChange={(e)=>{this.updatePassword(e)}} type="password"/>
            
            <button  onClick={()=>{this.login()}} className="little-green-btn" > Log In </button>
            <button onClick={()=>{this.login()}} className="little-green-btn" > Create New Account </button>
            </div>
        )
    }
}


export default User;