import React from 'react';
import axios from 'axios';
import './App.css';

const row = 4;
const col = 4;

class Pop extends React.Component {
  
  handleClick = (value) => {
    this.props.onPopClicked(value);
  }
  
  render() {
    const value = this.props.valObj === null ? 0 : this.props.valObj.value;

    return (
      <button className="pop w3-button w3-cell w3-cell-middle w3-light-grey w3-circle w3-xlarge"
        onClick={() => this.handleClick(value)}>
        {this.props.valObj !== null && (
          <div>
            <div>{String.fromCodePoint(this.props.valObj.icon)}</div>
            <div>{value}</div>
          </div>
        )}
      </button>
    )
  }
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      score: 0,
      items: 3
    };
  }

  handlePopClicked = (value) => {
    console.log(value);
    this.setState((state) => ({
      score: (state.score + value),
      items: (value === 0) ? (state.items - 1) : state.items
    }));
  }

  render() {
    let rows = [];
    let pop = Math.floor(Math.random() * row * col);

    for (let y = 0; y < row; y++) {
      let cols = [];
      for (let x = 0; x < col; x++) {
        let id = col * y + x;
        let val = id === pop ? this.props.valObj : null;
        cols.push(<Pop key={id} idx={id} valObj={val}
          onPopClicked={this.handlePopClicked} />);
      }
      rows.push(<div key={y}>{cols}</div>);
    }
    return (
      <div className="board">
        <div className="w3-cell-row w3-margin-bottom w3-dark-gray w3-padding">
          <div className="w3-cell">
          SCORE: {this.state.score}
          </div>
          <div className="w3-cell">
          ITEMS: {this.state.items}
          </div>
        </div>
        <div className="w3-center">
        {rows}
        </div>
      </div>
    )
  }
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gameOver: false,
      valObj: {},
      isMenu: true
    };
  }

  componentDidMount() {
    axios.get("http://localhost:8080/data")
    .then((res) => {
      this.gameObj = res.data;
    });
    
    this.timerID = setInterval(
      () => this.randomVal(), 1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  randomVal() {
    let idx = Math.floor(Math.random() * this.gameObj.data.length);
    this.setState({valObj: this.gameObj.data[idx]});
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
