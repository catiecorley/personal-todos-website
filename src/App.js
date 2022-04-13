// Author: Catie Corley
import React, { Component } from 'react';
import './App.css';
import Todo from './components/Todo/Todo.js'
import NewTodo from './components/NewTodo/NewTodo';


class App extends Component {
  constructor(){
    super();
    
    this.state = {
      todos: []
      
    }
    this.newToDo = this.newToDo.bind(this);
    this.sorttodos = this.sorttodos.bind(this);

  }
  componentDidMount(){
    const self = this;
    
    var temparray = [];
    var xhttp = new XMLHttpRequest();

    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
         temparray = JSON.parse(this.responseText);
     
        }
        self.setState({
          todos: temparray
        })
    }
    xhttp.open("GET", "https://cse204.work/todos", true);
    xhttp.setRequestHeader("x-api-key", "0f0fbb-d771e6-cf142e-cd6879-39c44c"); 
    xhttp.send();
};

sorttodos = (event) =>{
  event.preventDefault();
  const self = this;
  
  var temparray = self.state.todos;
  temparray.sort(function (a, b) {
    return a.text.localeCompare(b.text);
  })
       self.setState({
        todos: temparray
      })
}
newToDo = (event) =>{
  console.log("NEW TO DO")
  event.preventDefault();    
  const self = this;

  var newToDo = document.getElementById("inputfortodo").value;
  if(newToDo !== " "){
  var data = {
      text: newToDo
  }
  
  var xhttp2 = new XMLHttpRequest();


xhttp2.onreadystatechange = function() {

  if (this.readyState == 4 && this.status == 200) {
       var todo = JSON.parse(this.responseText);
      var temparray = self.state.todos;
      temparray.push(todo)
       self.setState({
        todos: temparray
      })
    

  } else if (this.readyState == 4) {
      console.log(this.responseText);
  }
  
  console.log("POSTED")

};

xhttp2.open("POST", "https://cse204.work/todos", true);

xhttp2.setRequestHeader("Content-type", "application/json");
xhttp2.setRequestHeader("x-api-key", "0f0fbb-d771e6-cf142e-cd6879-39c44c");
xhttp2.send(JSON.stringify(data));
document.getElementById("inputfortodo").value = ""; 

  }
}


  render() {
    return (
      <div className="App">

        <h1 className="header">Todo List</h1>

        <div>
          <NewTodo addTodo={this.newToDo} sortlist={this.sorttodos}/> 

        </div>

        <div id="listoftodos">
          <section id="myTodos">
              <ul>
                {this.state.todos.map((ele) => <Todo key={ele.id} id={ele.id} text={ele.text} completed={ele.completed}/> )}
              </ul>
          </section>
        </div>

      </div>
    );
  }
}

export default App;
