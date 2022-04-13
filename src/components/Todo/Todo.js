// Author: Catie Corley
import React, { Component } from 'react';
import './Todo.css';

class Todo extends Component {
  constructor(props){
    super(props);
    this.completeToDo = this.completeToDo.bind(this);
    this.deleteToDo = this.deleteToDo.bind(this);
    

  }
  componentDidMount(){
    var idofprop = this.props.id;
    var idofprop2 = this.props.text;

    if(this.props.completed == true){
      document.getElementById(idofprop).style.textDecoration = "line-through";
      document.getElementById(idofprop2).checked = true;

    }else{
      document.getElementById(idofprop).style.textDecoration = "none";
      document.getElementById(idofprop2).checked = false;
    }
  }
  completeToDo = (event) => { 
    event.preventDefault()
    var self = this;
    var todoid = this.props.id;
    var checkboxid = this.props.text;

    var data = {
        completed: true
    }
    var xhttp4 = new XMLHttpRequest();
    xhttp4.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          document.getElementById(todoid).style.textDecoration = "line-through";
          document.getElementById(checkboxid).checked = true;          

        } else if (this.readyState == 4) {
          console.log(this.responseText);
        }
    }
    xhttp4.open("PUT", "https://cse204.work/todos/" + todoid, true); 
    xhttp4.setRequestHeader("Content-type", "application/json");
    xhttp4.setRequestHeader("x-api-key", "0f0fbb-d771e6-cf142e-cd6879-39c44c");
    xhttp4.send(JSON.stringify(data));
  }
  deleteToDo = (event) => {
    event.preventDefault()
    var todoid = this.props.id;
    var xhttp5 = new XMLHttpRequest();
    xhttp5.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById(todoid).remove();

        } else if (this.readyState == 4) {
    
            console.log(this.responseText);
    
        }
    }
    xhttp5.open("DELETE", "https://cse204.work/todos/" + todoid, true); 
    xhttp5.setRequestHeader("Content-type", "application/json");
    xhttp5.setRequestHeader("x-api-key", "0f0fbb-d771e6-cf142e-cd6879-39c44c");
    xhttp5.send();


} 

  render() {
    return (
          <li id={this.props.id}>
            <input id={this.props.text} onClick={this.completeToDo} type="checkbox" className="completedbox" name="todocheck"></input>
               {this.props.text}
            <button type="button" onClick={this.deleteToDo} className="deleteButton">delete</button>
          </li>
             
    );
  }
}


export default Todo;
