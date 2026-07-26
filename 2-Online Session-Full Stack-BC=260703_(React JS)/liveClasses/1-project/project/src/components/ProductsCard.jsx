import React, {
  useState,
  useCallback,
  useRef,
  memo,
  useEffect
} from "react";
import { useDispatch } from "react-redux";
import { addItem } from "../store/slices/cartSlice";
import { useAppContext } from "../context/AppContext";

const ProductsCard = memo((props) => {
  const { img, rating, title, price } = props;

  const [isAdded, setIsAdded] = useState(false);
  const dispatch = useDispatch();
  const { currency, addToCartDelay } = useAppContext();

  useEffect(()=>{
    return ()=>{
        clearInterval(timerRef.current)
    }
  },[])

  // useRef (persist value without rerender)
  const timerRef = useRef(null);

  // useCallback (stable function reference)
  const handleAddToCart = useCallback(() => {
    dispatch(addItem({ ...props }));
    setIsAdded(true);

    timerRef.current = setTimeout(() => {
      setIsAdded(false);
    }, addToCartDelay);

  }, [dispatch, props, addToCartDelay]);

  return (
    <div className="product_card">
      <figure>
        <img src={img} alt="item-img" />
      </figure>

      <strong className="rating">{rating}</strong>
      <h4 className="title">{title}</h4>

      <h3 className="price">
        {currency} {price.toLocaleString()}
      </h3>

      <button
        className={`btn ${isAdded ? "added" : ""}`}
        onClick={handleAddToCart}
      >
        {isAdded ? "Added" : "Add to cart"}
      </button>
    </div>
  );
});

export default ProductsCard;