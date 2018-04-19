import React from 'react';
import ReactDOM from 'react-dom';

class Square extends React.Component {
  render() {
    return (
      <button className="">
        {}
      </button>
    )
  }
}

class Board extends React.Component {

  renderSquare() {
    return <Square />;
  }

  render() {
    return (
      <div>
        <div className=''>
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
        </div>
        <div className=''>
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
        </div>
        <div className=''>
          {this.renderSquare()}
          {this.renderSquare()}
          {this.renderSquare()}
        </div>
      </div>

    )
  }
}

class Game extends React.Component {
  render() {
    return (
      <Board />
    )
  }
}

export default Game;
