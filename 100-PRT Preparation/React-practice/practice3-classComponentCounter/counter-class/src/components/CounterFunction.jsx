import {useState} from 'react' ;
function CounterFunction(){
    const [count, setCount] = useState(0) ;

    const handleChange = (value) => {
        setCount(prevCount => prevCount + value)
    }
    const handleReset = () =>{
        setCount(count => count = 0) ;
    }

    return(
        <>
        <div>
            <div>Counter:{count}</div>
            <button onClick={() => {handleChange(1)}}>Increment</button>
            <button onClick={() => {handleChange(-1)}}>Decrement</button>
            <button onClick={handleReset}>Reset</button>
        </div>

        </>
    )
}

export default CounterFunction ;