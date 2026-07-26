import { useDispatch } from "react-redux";
import {
  removeItem,
  incrementItem,
  decrementItem,
  toggleCart
} from "../store/slices/cartSlice";

export const useCart = () => {
  const dispatch = useDispatch();

  const remove = (id) => dispatch(removeItem(id));
  const increment = (id) => dispatch(incrementItem(id));
  const decrement = (id) => dispatch(decrementItem(id));
  const toggleScroll = (value) => dispatch(toggleCart(value));
  return {
    remove,
    increment,
    decrement,
    toggleScroll
  };
};