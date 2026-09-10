function ChildComponent({products}){
    return(
        <>
        <h1 classNmae="product-container-header">Product details</h1>
        <p className="product-container-description">All product details are listed here</p>
        <div className="products">
        {
            products.map((product) => (
                <div key={product.id} className="product-item">{product.prodName}</div>
            ))
        }
        </div>
        </>
    )
}

export default ChildComponent ;