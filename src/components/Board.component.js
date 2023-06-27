import React from 'react';
import FloodFillsDataService from "../services/floodfills.service";
import Square from './Square.component.js';

export default class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  floodFillIterativeBackend(i, j){        
    const newColor = this.props.selectedColor;
    FloodFillsDataService.update(this.props.userid, this.props.currentFloodfill.id, j+1, i+1, newColor)
    .then(response => {
        console.log(response.data);        
        var floodfill = response.data;
        var pixelsUpdated = floodfill.pixels;
        const squares = this.props.squares;

        //update the backend new colors to the frontend squares
        for (let i = 0; i < squares.length; i++) {
          for (let j = 0; j < squares[i].length; j++) {
            var pixel = pixelsUpdated.find(e => e.x == j+1 && e.y == i+1);
            squares[i][j].color = pixel.color;
          }
        }

        var currentFloodfill = this.props.currentFloodfill;
        currentFloodfill.pixels = pixelsUpdated;
        this.setState({ currentFloodfill });
        this.setState({ squares });
    })
    .catch(e => {
      console.log(e);
    });
  }

  renderSquare(i, j) {  
    if(this.props.squares[i][j] == null)
    {
      return;
    }

    return <Square
      color={this.props.squares[i][j].color}
      onClick={() => this.floodFillIterativeBackend(i, j)}
      widthOfSquare={this.props.widthOfSquare}
      key={i + "," + j}
    />;
  }

  createTable() {
    let table = []
    
    for (let i = 0; i < this.props.currentFloodfill.sizeY; i++) {
      let children = []
      for (let j = 0; j < this.props.currentFloodfill.sizeX; j++) {
        children.push(this.renderSquare(i, j))
      }
      // Create the parent and add the children
      table.push(<div className="board-row" key={i}>{children}</div>)
    }
    return table
  }

  render() {
    return (
      <div>
        {this.createTable()}
      </div>
    );
  }
}