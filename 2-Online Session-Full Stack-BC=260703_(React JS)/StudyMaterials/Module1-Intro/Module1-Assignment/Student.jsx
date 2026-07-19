import React, {Component} from 'react' ;

class Student extends Component{
    constructor(props){
        super(props) ;
        this.name = "Uma" ;
        this.state = {
            "favoriteColor" : "Green" ,
            "place" : "Delhi"
        }
        this.handleClick = this.handleClick.bind(this);
    }
    
    handleClick(){
        this.setState({
            //"favoriteColor": "Red",
            "place":"Bengaluru"
        }) ;
    }

    componentDidUpdate(oldProps, oldState){ 
        if(this.state.favoriteColor !== oldState.favoriteColor ){
           console.log("Component did update is called!!!") ;
        }
    }

    componentDidMount(){
        // It has been called automatically by React
        console.log("Component is Mounted!!") ;
    }
    
    render(){
        console.log("Render is called!!!")
        return( <div>
            <p>Name: {this.name}</p>
            <p>Place: {this.state.place}</p>
            <p>favoriteColor: {this.state.favoriteColor}</p>
            <p>id: {this.props.id}</p>
            <p>marks: {this.props.marks}</p>

            <button onClick={this.handleClick}>
                Change Color
            </button>
            </div>)
    }
}


export default Student ;