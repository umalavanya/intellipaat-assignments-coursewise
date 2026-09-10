import './App.css'
import ChildComponent from './components/ChildComponent'

function App() {
  const products = [
    {id: 1, prodName:"Laptop", price:14000,description:"a good product"},
    {id: 2, prodName:"Desktop", price:16000,description:"a good product"},
    {id: 3, prodName:"Mobile", price:12000,description:"a good product"},
    {id: 4, prodName:"Headset", price:4000,description:"a good product"},
    {id: 5, prodName:"Bag", price:2000,description:"a good product"},

  ]

  return (
    <>
    <div className="main-container">
      <div className="products-container">
        
        <ChildComponent products={products}></ChildComponent>

      </div>
    </div>


    </>
  )
}

export default App
