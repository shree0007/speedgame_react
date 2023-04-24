import Circle from './Circle';
import './App.css';
import React, { Component } from 'react';


class App extends Component {

  state = {
    score: 0,
    counter: 0,
    circles: [1, 2, 3, 4]
  }
  clickHandler = () => {

    this.setState({
      score: this.state.score + 10
    })

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
            <button>START</button>
            <button>END</button>
          </div>

        </div>

      </div>
    );
  }
}

export default App;