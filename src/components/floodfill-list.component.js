import React,{Component} from 'react';
import FloodFillsDataService from "../services/floodfills.service";
import Board from './Board.component.js';

export default class FloodFillList extends Component{

    constructor(props){
        super(props);

        this.state={    
            currentFloodfill: null,
            selectedColor: '',
            floodfills:[],
        }
    }    

    refreshList(){        
        FloodFillsDataService.getAll(this.props.userid)
        .then(response => {
          this.setState({
            floodfills: response.data
          });
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });        
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.userid !== this.props.userid) {
            this.setState({currentFloodfill: null});
            this.refreshList();
        }
      }

    componentDidMount(){
        this.refreshList();
    }
    
    handleSelectedColorChange=(e)=>{
        this.setState({selectedColor: e.target.value});
    }

    editClick(e){
        this.resetBoard(e);
    }

    deleteClick(e){
        FloodFillsDataService.delete(this.props.userid, e.id)
        .then(response => {
          console.log(response.data);
          this.setState({currentFloodfill: null});
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });   
    }    

    generateSquares(pixels, sizeX, sizeY) {
        const squares = []
        for(let y = 0; y < sizeY; y++) {
          squares[y] = [];
          for(let x = 0; x < sizeX; x++) {
            var pixel = pixels.find(e => e.x == x+1 && e.y == y+1);
            squares[y][x] = {                
              color: pixel.color,
              visited: false
            }
          }
        }
        return squares;
      }

    resetBoard(currentFloodfill) {
        //square had to be inital loaded here because the object can be huge and the setState is async. So, we are sure the board component will have it to render.
        const squares = this.generateSquares(currentFloodfill.pixels, currentFloodfill.sizeX, currentFloodfill.sizeY);
        var squaresPerRow = currentFloodfill.sizeX;
        var squaresPerCol = currentFloodfill.sizeY;
        var widthOfSquare = 20;
        const state = {
          widthOfSquare,
          squaresPerRow,
          squaresPerCol,
          selectedColor: currentFloodfill.colors[0],
          currentFloodfill,
          squares
        }
    
        this.setState(state);
      }

    render(){
        return(
<div>           
    <table className="table table-striped">
    <thead>
    <tr>
        <th>
            Id
        </th>
        <th>
            Name
        </th>
        <th>
            SizeX
        </th>
        <th>
            SizeY
        </th>
        <th>
            Color 1
        </th>
        <th>
            Color 2
        </th>
        <th>
            Color 3
        </th>
        <th>
            Options
        </th>                                            
    </tr>
    </thead>
    <tbody>
        {this.state.floodfills.map(e=>
            <tr key={e.id}>
                <td>{e.id}</td>
                <td>{e.name}</td>
                <td>{e.sizeX}</td>
                <td>{e.sizeY}</td>
                <td>{e.colors[0]}</td>
                <td>{e.colors[1]}</td>
                <td>{e.colors[2]}</td>
                <td>
                <button type="button" className="btn btn-light mr-1" onClick={()=>this.editClick(e)}>View</button>
                <button type="button" className="btn btn-light mr-1" onClick={()=>this.deleteClick(e)}>Delete</button>
                </td>
            </tr>
        )}
    </tbody>
    </table>
    <br/>    
    <br/>
    {this.state.currentFloodfill == null ? null : 
        <div className="card">           
            <div className="form-group">
            <h1>{this.state.currentFloodfill.id} - {this.state.currentFloodfill.name}</h1>
            <div className="input-group mb-3">
                <span className="input-group-text">Select the color:</span>
                <select className="form-control form-control-lg" value={this.state.selectedColor} onChange={this.handleSelectedColorChange} >
                    <option value={this.state.currentFloodfill.colors[0]}>{this.state.currentFloodfill.colors[0]}</option>
                    <option value={this.state.currentFloodfill.colors[1]}>{this.state.currentFloodfill.colors[1]}</option>
                    <option value={this.state.currentFloodfill.colors[2]}>{this.state.currentFloodfill.colors[2]}</option>
                </select>            
            </div>
            <h3>Pick the square you want to color:</h3>
            <div className="panel panel-default">
            <div className="panel-body">       
                <div class="card">
                    <div class="card-body">
                        <Board 
                        currentFloodfill={this.state.currentFloodfill}
                        userid={this.props.userid}
                        widthOfSquare={this.state.widthOfSquare}
                        squaresPerRow={this.state.squaresPerRow}
                        squaresPerCol={this.state.squaresPerCol}
                        includeDiagonals={this.state.includeDiagonals}
                        selectedColor={this.state.selectedColor}
                        squares={this.state.squares}
                        />
                    </div>
                </div>  
            </div>
            </div>
            </div>              
        </div>
    }
<br/>
<br/>
</div>
        )
    }
}