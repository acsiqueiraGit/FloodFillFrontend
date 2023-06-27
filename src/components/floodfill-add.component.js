import React,{Component} from 'react';
import FloodFillsDataService from "../services/floodfills.service";

export default class FloodFillAdd extends Component{    

    constructor(props){
        super(props);

        this.state={
            name: 'My panel 01',
            sizeX: 20,
            sizeY: 20,
            color1: "blue",
            color2: "red",
            color3: "yellow"
        }

        this.onInputchange = this.onInputchange.bind(this);                
    }       

    onInputchange(event) {        
        this.setState({
          [event.target.name]: event.target.value
        });
    }

    createClick(){
        var colors = [this.state.color1, this.state.color2, this.state.color3];
        FloodFillsDataService.Add(this.props.userid,this.state.name, this.state.sizeX, this.state.sizeY, colors)
        .then(response => {
            alert("FloodFill created as ID: " + response.data.id);
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        }); 
    }    

    render(){
        return(
<div>           
    <div class="form-group">
       <div className="input-group mb-3">
        <span className="input-group-text">Name</span>
        <input type="text" className="form-control" name="name" value={this.state.name} onChange={this.onInputchange}/>
       </div>
       <div className="input-group mb-3">
        <span className="input-group-text">Size X</span>
        <input type="text" className="form-control" name="sizeX" value={this.state.sizeX} onChange={this.onInputchange}/>
       </div>
       <div className="input-group mb-3">
        <span className="input-group-text">Size Y</span>
        <input type="text" className="form-control" name="sizeY" value={this.state.sizeY} onChange={this.onInputchange}/>
       </div>
       <div className="input-group mb-3">
        <span className="input-group-text">Color 1</span>
        <input type="text" className="form-control" name="color1" value={this.state.color1} onChange={this.onInputchange}/>
       </div>
       <div className="input-group mb-3">
        <span className="input-group-text">Color 2</span>
        <input type="text" className="form-control" name="color2" value={this.state.color2} onChange={this.onInputchange}/>
       </div>
       <div className="input-group mb-3">
        <span className="input-group-text">Color 3</span>
        <input type="text" className="form-control" name="color3" value={this.state.color3} onChange={this.onInputchange}/>
       </div>              
       <button type="button"className="btn btn-primary float-start" onClick={()=>this.createClick()} >Create</button>
   </div>
</div>
        )
    }
}