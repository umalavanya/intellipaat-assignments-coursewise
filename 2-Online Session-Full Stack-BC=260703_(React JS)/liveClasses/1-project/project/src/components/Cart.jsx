import React, { useEffect, useMemo, useCallback } from "react";
// import { useCart } from "../hooks/useCart";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleCart,
  removeItem,
  incrementItem,
  decrementItem
} from "../store/slices/cartSlice";
import { useAppContext } from "../context/AppContext";

const Cart = () => {
    const { isCartOpen, cartItems } = useSelector((state) => state.cart);

    const dispatch = useDispatch();
    const { currency } = useAppContext();

    // memoized handlers
    const handleRemove = useCallback(
        (id) => dispatch(removeItem(id)),
        [dispatch]
    );

    const handleIncrement = useCallback(
        (id) => dispatch(incrementItem(id)),
        [dispatch]
    );

    const handleDecrement = useCallback(
        (id) => dispatch(decrementItem(id)),
        [dispatch]
    );

    const handleCloseCart = useCallback(
        () => dispatch(toggleCart(false)),
        [dispatch]
    );

    const cartTotal = useMemo(() => {
        return cartItems
        .map(item => item.price * item.quantity)
        .reduce((a, b) => a + b, 0);
    }, [cartItems]);

    const cartQuantity = useMemo(
        () => cartItems.length,
        [cartItems]
    );

    useEffect(() => {
        const body = document.body;
        body.classList.toggle("overflow_hide", isCartOpen);
        return () => {
            body.classList.remove("overflow_hide");
        };
    }, [isCartOpen]);

    // throw new Error("Testing Error")
    return (
        <>
            {
                isCartOpen && (
                    <div id="cart">
                        <div className="cart_content">
                            <div className="cart_head">
                                <h2>Cart <small>({cartQuantity})</small></h2>
                                <div
                                    title="Close"
                                    className="close_btn"
                                    onClick={() => handleCloseCart(false)}
                                >
                                    <span>&times;</span>
                                </div>
                            </div>

                            <div className="cart_body">
                                {
                                    cartQuantity === 0 ? (
                                        <h2>Cart is empty</h2>
                                    ) : (
                                        cartItems.map(item => {
                                            const { id, img, title, price, quantity } = item;
                                            const itemTotal = price * quantity;

                                            return (
                                                <div className="cart_items" key={id}>
                                                    <figure className="cart_items_img">
                                                        <img src={img} alt="product-img" />
                                                    </figure>

                                                    <div className="cart_items_info">
                                                        <h4>{title}</h4>
                                                        <h3 className="price">₹ {itemTotal.toLocaleString()}</h3>
                                                    </div>

                                                    <div className="cart_items_quantity">
                                                        <span onClick={() => handleDecrement(id)}>&#8722;</span>
                                                        <b>{quantity}</b>
                                                        <span onClick={() => handleIncrement(id)}>&#43;</span>
                                                    </div>

                                                    <div
                                                        title="Remove Item"
                                                        className="cart_items_delete"
                                                        onClick={() => handleRemove(id)}
                                                    >
                                                        <span>&times;</span>
                                                    </div>
                                                </div>
                                            );
                                        })
                                    )
                                }
                            </div>

                            <div className="cart_foot">
                                <h3>
                                    <small>Total:</small>
                                    <b>{currency} {cartTotal.toLocaleString()}</b>
                                </h3>

                                <button
                                    type="button"
                                    className="checkout_btn"
                                    disabled={cartQuantity === 0}
                                >
                                    Checkout
                                </button>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    );

};

export default Cart;



