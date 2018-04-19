import React from 'react';
import ReactDOM from 'react-dom';
import '../css/index.css';
import Game from './game';

class PlayerName extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

      uname1: '',
      uname2: ''

    }
    this.handleChange = this.handleChange.bind(this);

  }

  handleChange(event) {

    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    }, () => {
      console.log('state in PlayerName: ', this.state)
      this.props.getName(this.state)
    });
    // console.log('state in PlayerName: ', this.state)

  }

  render() {
    // console.log('PlayerName props: ', this.props)

    if(this.props.choice === '2') {
      return(
        <label>
          <p>Player 1:</p>
          <input name='uname1' onChange={this.handleChange} />

          <p>Player 2:</p>
          <input name='uname2' onChange={this.handleChange} />
        </label>
      )
    } else {
      return(
        <label>
          <p>Player name:</p>
          <input name='uname1' onChange={this.handleChange} />
        </label>
      )
    }

  }
}

class PlayerForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      choice: '1',
      level: '1',
      names: {
        uname1: '',
        uname2: ''
      }
    };
    this.players = {
      uname1: '',
      uname2: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getName = this.getName.bind(this);
  }

  // componentDidCatch(err, info) {
  //   console.log(err, info);
  //   alert('ss')
  // }

  handleSubmit(e) {
    console.log('Form submitted: ', this.players);
    // alert('Please enter names');
    // return;
    if(this.state.choice === '1' && this.players.uname1.length === 0) {
      alert('Please enter a name');
      return;
    }
    if(
      this.state.choice === '2' &&
      this.players.uname1.length === 0 &&
      this.players.uname2.length === 0
    ) {
      alert('Please enter names');
      return;
    }
    // return;
    e.preventDefault();
    // this.setState({names: name})
    this.props.gameInfo({level:this.state.level, players: this.players});
  }

  handleChange(event) {
    console.log('select name: ', event.target.name);
    console.log('select value: ', event.target.value);
    if(event.target.name === 'choice') {
      this.setState({
        choice: event.target.value
      });
    }
    if(event.target.name === 'level') {
      this.setState({
        level: event.target.value
      });
    }
  }

  getName(name) {
    console.log('name from child: ', name);
    // this.props.players = name.names;
    this.players = name;
    // this.setState({names: name});
  }

  render() {
    // console.log('player form render')
    return(
      <div className='playerForm'>
        <form onSubmit={this.handleSubmit}>
          <label>
            Select Player:
            <br></br>
            <br></br>
            <select name='choice' onChange={this.handleChange}>
              <option value='1'>Single player</option>
              <option value='2'>Multi player</option>
            </select>
            <PlayerName choice={this.state.choice} getName={this.getName}/>
          </label>
          <label>
            <p>Select level:</p>
            <select name='level' onChange={this.handleChange}>
              <option value='1'>Easy</option>
              <option value='2'>Medium</option>
              <option value='3'>Hard</option>
            </select>
          </label>
          <br></br>
          <br></br>
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      page: 'start',
      title: 'Tic Tac Toy',
      level: '',
      players: {}
    }
    this.getGameInfo = this.getGameInfo.bind(this);
  }

  getGameInfo(gameInfo) {
    console.log('gameInfo: ', gameInfo)
    this.setState({
      page: 'game',
      title: 'Welcome, enjoy the game',
      level: gameInfo.level,
      players: gameInfo.players
    })
  }

  renderPage() {
    if (this.state.page === 'start') {
      return <PlayerForm gameInfo={this.getGameInfo}/>
    }
    if (this.state.page='game') {
      return <Game level={this.state.level} players={this.state.players}/>
    }
  }

  render() {
    return (<div>
      <div className="navbar">
        <h2 className='title'>{this.state.title}</h2>
      </div>
      <div className="leftnav">
        <div id="uname" className="player_info">
          <p>{this.state.players.uname1}</p>
          <p>{this.state.players.uname2}</p>
        </div>
        <div id="level" className="player_info">
          <p>{this.state.level}</p>
        </div>
      </div>
      <div>
        {this.renderPage()}
      </div>
    </div>)
  }
}

ReactDOM.render(
  <Home />,
  document.getElementById('root')
);
