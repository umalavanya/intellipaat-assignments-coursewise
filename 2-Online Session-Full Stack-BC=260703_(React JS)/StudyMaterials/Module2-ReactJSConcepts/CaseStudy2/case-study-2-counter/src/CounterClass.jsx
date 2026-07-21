import React, { Component } from 'react';
import './CounterClass.css';

class CounterClass extends Component {
  constructor(props) {
    super(props);
    // Initialize state with counter value set to 0
    this.state = {
      count: 0
    };
  }

  // Lifecycle method - called when component mounts
  componentDidMount() {
    console.log('Counter component has mounted!');
    console.log('Initial count value:', this.state.count);
  }

  // Method to increment the counter
  incrementCounter = () => {
    this.setState((prevState) => ({
      count: prevState.count + 1
    }));
  }

  // Method to decrement the counter
  decrementCounter = () => {
    this.setState((prevState) => ({
      count: prevState.count - 1
    }));
  }

  // Method to reset the counter to 0
  resetCounter = () => {
    this.setState({
      count: 0
    });
  }

  render() {
    const { count } = this.state;

    return (
      <div className="counter-container">
        <div className="counter-card">
          <h1 className="counter-title">Counter Application</h1>
          
          <div className="counter-display">
            <span className="counter-value">{count}</span>
          </div>

          <div className="counter-buttons">

            <button 
              className="btn btn-increment"
              onClick={this.incrementCounter}
            >
              Increment
            </button>

            <button 
              className="btn btn-decrement"
              onClick={this.decrementCounter}
            >
              Decrement
            </button>
            
            <button 
              className="btn btn-reset"
              onClick={this.resetCounter}
            >
              Reset
            </button>
            
            
          </div>

          <div className="counter-status">
            <p>Status: {count > 0 ? 'Positive' : count < 0 ? 'Negative' : 'Zero'}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default CounterClass;