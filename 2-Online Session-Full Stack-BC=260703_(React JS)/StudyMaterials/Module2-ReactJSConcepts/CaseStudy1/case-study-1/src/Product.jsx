import React from 'react' ;


function Product({name, price, description}){


    return(   
        
        <div className="product-card">
            <div className="product-header">
                <h3 className="product-name">{name}</h3>
                <span className="product-price">${price}</span>
            </div>
            <p className="product-description">{description}</p>
            <button className="add-to-cart-btn">Add to Cart</button>
        </div>

    );
}

export default Product ;