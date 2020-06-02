import React from 'react';
import axios from 'axios';
import './App.css';

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
      valObj: {},
      score: 0,
      items: 3
    };
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.randomVal(), 1000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  randomVal() {
    let idx = Math.floor(Math.random() * this.props.gameObj.data.length);
    this.setState({valObj: this.props.gameObj.data[idx]});
  }

  handlePopClicked = (value) => {
    let items = this.state.items;
    (value === 0) && --items;

    this.setState((state) => ({
      score: (state.score + value),
      items: items
    }));
    items <= 0 && this.props.onGameover();
  }

  render() {
    const row = this.props.boardSize;
    const col = this.props.boardSize;
    let rows = [];
    let pop = Math.floor(Math.random() * row * col);

    for (let y = 0; y < row; y++) {
      let cols = [];
      for (let x = 0; x < col; x++) {
        let id = col * y + x;
        let val = (id === pop && Object.keys(this.state.valObj).length !== 0 ) ? this.state.valObj : null;
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

class Title extends React.Component {
  render() {
    return (
      <div className="w3-deep-purple w3-padding">
        <h1><b>Quick Click React</b></h1>
        <div className="w3-right-align">
          <div>
            <a href="https://twitter.com/sumomo_99?ref_src=twsrc%5Etfw" className="twitter-follow-button" data-show-count="false">Follow @sumomo_99</a>
          </div>
          <div className="w3-small">
            &copy;2020 sumomo_99
          </div>
        </div>
      </div>
    );
  }
}

class Menu extends React.Component {
  render() {
    return (
      <div className="menu w3-center">
        <button className="menu-btn w3-button w3-blue w3-padding-16 w3-margin w3-card-4"
        onClick={() => this.props.onClick(4)}>
          Easy
        </button>
        <button className="menu-btn w3-button w3-blue w3-padding-16 w3-margin w3-card-4"
        onClick={() => this.props.onClick(6)}>
          Normal
        </button>
        <button className="menu-btn w3-button w3-blue w3-padding-16 w3-margin w3-card-4"
        onClick={() => this.props.onClick(8)}>
          Hard
        </button>
      </div>
    );
  }
}

class GameOver extends React.Component {
  render() {
    return(
      <div className="w3-margin">
        <div className="w3-tag w3-xxlarge w3-padding w3-orange">
          <b>Game Over</b>
        </div>
        <div className="w3-margin">
          <button className="w3-cell w3-button w3-blue w3-margin w3-card-4"
            onClick={this.props.onGameover}>
            Retry
          </button>
          <button className="w3-cell w3-button w3-blue w3-margin w3-card-4"
            onClick={this.props.onMenu}>
            Back to Menu
          </button>
        </div>
      </div>
    );
  }
}

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMenu: true,
      isGameover: false,
      boardSize: 4
    };
  }

  componentDidMount() {
    axios.get("http://localhost:8080/data")
    .then((res) => {
      this.gameObj = res.data;
    });
  }

  handleGameover = () => {
    const flag = !this.state.isGameover;
    this.setState({
      isGameover: flag
    });
  }

  handleMenu = (val) => {
    const flag = !this.state.isMenu;
    this.setState({
      isMenu: flag,
      isGameover: false,
      boardSize: val
    });
  }
  
  render() {
    return (
      <div className="game w3-container">
        <Title />
        { this.state.isMenu ? 
        <Menu onClick={this.handleMenu}/> : 
        (<div className="game-board w3-center">
          {this.state.isGameover ?
            <GameOver 
            onGameover={this.handleGameover}
            onMenu={this.handleMenu}/> :
          <Board gameObj={this.gameObj}
            boardSize={this.state.boardSize}
            onGameover={this.handleGameover} />
          }
        </div>)
        }
      </div>
    )
  }
}
