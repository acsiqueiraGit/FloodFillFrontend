import logo from './logo.svg';
import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import React, { Component } from "react";
import FloodFillList from './components/floodfill-list.component.js';
import FloodFillAdd from './components/floodfill-add.component.js';


export default class App extends Component {
  constructor(props){
    super(props);

    this.state={
      userid:'AAA'
    }

    this.onInputchange = this.onInputchange.bind(this);
  } 
  
  onInputchange(event) {        
    this.setState({
      [event.target.name]: event.target.value
    });
  }  

  render(){
    return(      
      <div className="App container">
      <h2 className="d-flex justify-content-center m-3">
        FloodFill Frontend App
      </h2>       
    <div>
    <div className="input-group mb-3">
        <span className="input-group-text">Username</span>
        <input type="text" name="userid" className="form-control" value={this.state.userid} onChange={this.onInputchange}/>
    </div>
    </div>      
      <nav className="navbar navbar-expand-sm bg-light navbar-dark">
        <ul className="navbar-nav">
          <li className="nav-item- m-1">
            <Link to={"/floodfilllist"} className="btn btn-light btn-outline-primary">
              My FloodFill Panels
            </Link>
          </li>
          <li className="nav-item- m-1">
            <Link to={"/floodfilladd"} className="btn btn-light btn-outline-primary">
              Create new FloodFill Panel
            </Link>
          </li>          
        </ul>
      </nav>      
      <div className="container mt-3">
          <Routes>
            <Route path="/floodfilllist" element={<FloodFillList userid={this.state.userid}/>}/>
            <Route path="/floodfilladd" element={<FloodFillAdd userid={this.state.userid}/>}/>
          </Routes>
        </div>
     </div>

    )
  }
}
