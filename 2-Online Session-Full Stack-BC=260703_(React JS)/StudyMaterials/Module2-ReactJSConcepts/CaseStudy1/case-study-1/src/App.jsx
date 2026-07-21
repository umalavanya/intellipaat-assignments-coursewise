import React from 'react' ;
import Product from './Product'
import './App.css'

function App(){

  const products = [
    {
      "id": 1,  
      "name": "Laptop",
      "price": 999,
      "description": "A high performance Laptop"
    },
    {
      "id": 2, 
      "name": "Smartphone",
      "price": 799,
      "description": "Latest 5G smartphone with advanced camera"
    },
    {
      "id": 3, 
      "name": "Wireless Headphones",
      "price": 149,
      "description": "Noise-cancelling over-ear headphones"
    },
    {
      "id": 4, 
      "name": "Smart Watch",
      "price": 299,
      "description": "Fitness tracker with heart rate monitor"
    },
    {
      "id": 5, 
      "name": "Tablet",
      "price": 449,
      "description": "10-inch display with stylus support"
    },
    {
      "id": 6, 
      "name": "Bluetooth Speaker",
      "price": 89,
      "description": "Portable waterproof speaker with 20hr battery"
    },
    {
      "id": 7, 
      "name": "Gaming Console",
      "price": 499,
      "description": "4K gaming console with 1TB storage"
    },
    {
      "id": 8, 
      "name": "External SSD",
      "price": 129,
      "description": "1TB portable solid state drive"
    },
    {
      "id": 9,
      "name": "Wireless Charger",
      "price": 39,
      "description": "Fast charging pad for all Qi-compatible devices"
    },
    {
      "id": 10,
      "name": "Action Camera",
      "price": 349,
      "description": "4K waterproof action camera with image stabilization"
    }
]

  return(
    <div className="app">
      <div className="app-title">
        <div className="products-gris">
          {products.map(product => (
            <Product 
              key={product.id}
              name={product.name}
              price={product.price}
              description={product.description}
              />
          ))}
        </div>
      </div>
    </div>
  )
}

export default App ;
