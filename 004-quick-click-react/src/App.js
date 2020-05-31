import React from 'react';
import axios from 'axios';
import './App.css';

const row = 4;
const col = 4;

class Pop extends React.Component {
  
  render() {
    return (
      <div className="pop w3-cell w3-cell-middle w3-light-grey w3-circle">
        {this.props.valObj === null ? "" : (
          <div className=" w3-center w3-xlarge">
          <div>{String.fromCodePoint(this.props.valObj.icon)}</div>
          <div>{this.props.valObj.value}</div>
          </div>
        )}
      </div>
    )
  }
}

class Board extends React.Component {
  render() {
    let rows = [];
    let pop = Math.floor(Math.random() * row * col);

    for (let y = 0; y < row; y++) {
      let cols = [];
      for (let x = 0; x < col; x++) {
        let id = col * y + x;
        let val = id === pop ? this.props.valObj : null;
        cols.push(<Pop key={id} idx={id} valObj={val} />);
      }
      rows.push(<div key={y} className="row">{cols}</div>);
    }
    return (
      <div className="board">
        {rows}
      </div>
    )
  }
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      score: 0,
      items: 3,
      gameOver: false,
      gameObj: {},
      valObj: {},
      isMenu: true
    };
  }
  
  componentDidMount() {
    axios.get("http://localhost:8080/data")
    .then((res) => {
      this.setState({gameObj: res.data});
    });
    
    this.timerID = setInterval(
      () => this.randomVal(), 1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  randomVal() {
    let idx = Math.floor(Math.random() * this.state.gameObj.data.length);
    this.setState({valObj: this.state.gameObj.data[idx]});
  }
  
  render() {
    return (
      <div className="game w3-container w3-margin">
        { this.state.isMenu ? 
        (<div className="menu">
          <button className="w3-button w3-blue w3-padding-16"
          onClick={() => this.setState({isMenu: false})}>
            New Game
          </button>
        </div>) : 
        (<div className="game-board">
          <Board valObj={this.state.valObj} />
        </div>)
        }
      </div>
    )
  }
}
