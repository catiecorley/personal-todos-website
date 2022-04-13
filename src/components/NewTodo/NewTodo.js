// Author: Catie Corley
import React, { Component } from 'react';
import './NewTodo.css';

class NewTodo extends Component {
 
  render() {
    
    return (
      <form id="newtodoform">
        <input id="inputfortodo" placeholder="enter task"></input>
        <button onClick={this.props.addTodo} type="submit" id="submitbutton">Add Todo</button>
        <button onClick={this.props.sortlist} type="submit" id="submitbutton">Sort Alphabetically</button>

      </form>
      
      
    );
  }
}
  


export default NewTodo;
