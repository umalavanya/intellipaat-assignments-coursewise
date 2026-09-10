import React, {Component} from 'react' ;

class CounterClass extends Component {
    constructor(props){
        super(props) ;
        this.state = {
            count: 0
        }
    }

    componentDidMount(){
        console.log('Counter component mounted successfully!!') ;
        console.log('Initial count:', this.state.count) ;
        console.log('Time:', new Date().toLocaleTimeString());
    }

    handleChange = (value) => {
        this.setState(prevState => ({
            count:prevState.count + value 
        }))
    }

    handleReset = () =>{
        this.setState({
            count: 0
        })
    }

    render(){

        return(
            <div>
            <div>Counter: {this.state.count}</div>
            <button onClick={() => this.handleChange(1)}>Increment</button>
            <button onClick={() => this.handleChange(-1)}>Decrement</button>
            <button onClick={this.handleReset}>Reset</button>
        </div>
        ) ;
        
        
    }
}


export default CounterClass ;