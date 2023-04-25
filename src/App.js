import Circle from './components/Circle';
import './App.css';
import React, { Component } from 'react';
import Modal from './components/Modal';


class App extends Component {

  state = {
    circles: [1, 2, 3, 4],
    score: 0,
    current: 0,
    pace: 1000,
    rounds: 0,
    showModal: false,
    startGame: false


  }

  startHandler = () => {
    this.setState({
      startGame: true,
    });
    this.timer = setInterval(this.randomNumber, this.state.pace);

  }



  clickHandler = () => {

    this.setState({
      score: (this.state.score + 10)
    })

  }

  endHandler = () => {
    clearInterval(this.timer);
    this.setState({
      timer: this.timer,
      showModal: true,
      rounds: 0
    });
  }

  modalHandler = () => {
    window.location.reload();
  }

  render() {
    return (
      <div className='App'>
        <div className='container'>
          <div>
            <h1>SPEED GAME</h1>
          </div>
          <div>
            <p>SCORE: <span>{this.state.score}</span></p>
          </div>
          <div className='circles'>
            {this.state.circles.map(() => (<Circle click={this.clickHandler} />))}
          </div>
          <div className='buttons'>
            <button onClick={this.startHandler} disabled={this.timer}>START</button>
            <button onClick={this.endHandler} disabled={!this.timer} >END</button>
          </div>

        </div>
        {this.state.showModal && <Modal score={this.state.score} close={this.modalHandler} />}
      </div>
    );
  }
}

export default App;