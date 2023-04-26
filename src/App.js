import Circle from './components/Circle';
import './App.css';
import React, { Component } from 'react';
import Modal from './components/Modal';

import audioStart from './assets/audio/audioStart.mp3';
import audioClick from './assets/audio/audioClick.mp3';
import audioEnd from './assets/audio/audioEnd.mp3';


const getRndInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


class App extends Component {

  state = {
    circles: [1, 2, 3, 4],
    score: 0,
    current: 0,
    pace: 1000,
    rounds: 0,
    showModal: false,
    startGame: false,
    timer: 0,
    click: false,
    audioStart: new Audio(audioStart),
    audioClick: new Audio(audioClick),
    audioEnd: new Audio(audioEnd)


  }


  randomNumber = () => {
    this.state.audioStart.play();
    let nextActive;

    do {
      nextActive = getRndInteger(1, 4)
    } while (this.state.current === nextActive)


    this.setState({
      current: nextActive,
      pace: this.state.pace * 0.98,
      rounds: this.state.rounds + 1,
      timer: setTimeout(this.randomNumber, this.state.pace)

    })

    if (this.state.rounds >= 3) {
      return this.endHandler()
    }

  }


  startHandler = () => {
    this.state.audioStart.play();
    this.randomNumber()
    this.setState({
      startGame: true,
      click: true
    });

  }



  clickHandler = (num) => {
    this.state.audioClick.play();
    if (this.state.current !== num) {
      return this.endHandler()
    }
    this.setState({
      score: (this.state.score + 10)
    })

  }

  endHandler = () => {
    this.state.audioStart.pause();
    this.state.audioEnd.play();
    this.setState({
      timer: clearTimeout(this.state.timer),
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
            {this.state.circles.map((circle) => (<Circle
              pointer={this.state.click}
              click={() => this.clickHandler(circle)}
              active={this.state.current === circle} />))}
          </div>



          <div className='buttons'>
            <button className={`${this.state.timer ? 'display' : ''}`} onClick={this.startHandler}>START</button>
            <button className={`${!this.state.timer ? 'display' : ''}`} onClick={this.endHandler}>END</button>
          </div>

        </div>
        {this.state.showModal && <Modal score={this.state.score} message={
          this.state.score <= 50 ? `You scored only ${this.state.score}, better luck next time` : this.state.score <= 90 ? `You scored ${this.state.score}, you are doing great, keep pushing` : `You scored ${this.state.score}, Congratulations! you are the winner :)`
        } close={this.modalHandler} />}
      </div>
    );
  }
}

export default App;