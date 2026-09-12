import {Component} from 'react' ;
class ExpenseTracker extends Component{
    constructor(props){
        super(props);
    }

render(){
    const list = [
        {id:1, name:"milk,",category:"dairy"},
        {id:2, name:"onions,",category:"vegetables"}
    ]

    return (
        <>
        <div>{
            list.map((item) => {
                <table>
                    <tr>
                      <th>{item.name}</th>
                      <th>{item.category}</th>
                    </tr>
                </table>
                
            })
            }</div>
        </>
    )
}} 

export default ExpenseTracker ;