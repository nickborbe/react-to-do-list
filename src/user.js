import React, { Component } from 'react';
import axios from 'axios';


class User extends Component {
    constructor(props){
        super(props)
        this.state = {
            usernameInput: '',
            passwordInput: '',
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
            console.log(response.data);
        })

    }

    render(){
        return(
            <div>
            <h3> User Component </h3>
            {/* <div>username here</div> */}
            <label> Username </label>
            <input value = {this.state.usernameInput} onChange={(e)=>{this.updateUsername(e)}} type="text"/>
            <label> Password </label>
            <input value = {this.state.passwordInput} onChange={(e)=>{this.updatePassword(e)}} type="password"/>
            
            <button onClick={()=>{this.login()}} > Log In </button>
            </div>
        )
    }
}


export default User;