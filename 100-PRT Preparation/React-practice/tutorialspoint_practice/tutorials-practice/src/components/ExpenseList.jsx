import { Component } from "react";

class ExpenseList extends Component{
    constructor(props){
        super(props) ;
    }
    render(){
        const list = this.props.items.map((item) => (
            <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.amount}</td>
                <td>{new Date(item.spendDate).toString()}</td>
                <td>{item.category}</td>
            </tr> )
        ) ;
        return(
            <table>
                <thead>
                    <tr>
                        <th>Item</th>
                        <th>Amount</th>
                        <th>Date</th>
                        <th>Category</th>
                    </tr>
                </thead>
                <tbody>
                    {list}
                </tbody>
            </table>
        ) ;
    }

}

export default ExpenseList ;