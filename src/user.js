import React, { Component } from 'react';
import axios from 'axios';


class User extends Component {
    constructor(props){
        super(props)
        this.state = {
    
        }
    }

    render(){
        return(
            <div>
            <h3> User Component </h3>
            {/* <div>username here</div> */}
            <label> Username </label>
            <input type="text"/>
            <label> Password </label>
            <input type="password"/>
            
            </div>
        )
    }
}


export default User;