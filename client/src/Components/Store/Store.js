import { createStore } from "redux";
import PizzaReducer from "../Reducers/PizzaReducer";

export const Store = createStore(
  PizzaReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
