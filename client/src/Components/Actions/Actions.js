import {
  ADD_TO_CART,
  DELETE_FROM_CART,
  ADD_ONE,
  DELETE_ONE,
} from "../Constants/Constants";

const addToCart = ({ Pizza }) => {
  return {
    type: ADD_TO_CART,
    Pizza,
  };
};

const deleteFromCart = ({ Id }) => {
  return {
    type: DELETE_FROM_CART,
    Id,
  };
};

const addOne = ({ Id }) => {
  return {
    type: ADD_ONE,
    Id,
  };
};

const deleteOne = ({ Id }) => {
  return {
    type: DELETE_ONE,
    Id,
  };
};

export { addToCart, deleteFromCart, addOne, deleteOne };
