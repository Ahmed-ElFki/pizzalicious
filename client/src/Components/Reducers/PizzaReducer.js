import {
  ADD_TO_CART,
  DELETE_FROM_CART,
  ADD_ONE,
  DELETE_ONE,
} from "../Constants/Constants";

const intialState = [];

const PizzaReducer = (state = intialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const pizzaExists = state.find(
        (current) => current.id === action.Pizza.id
      );
      if (pizzaExists === undefined)
        return [...state, { ...action.Pizza, qte: 1 }];
      else
        return [
          ...state.map((current) => {
            if (current.id === action.Pizza.id)
              return { ...current, qte: current.qte + 1 };
            else return current;
          }),
        ];
    case DELETE_FROM_CART:
      return [...state.filter((current) => current.id !== action.Id)];
    case ADD_ONE:
      return [
        ...state.map((current) => {
          if (current.id === action.Id)
            return { ...current, qte: current.qte + 1 };
          else return current;
        }),
      ];
    case DELETE_ONE:
      return [
        ...state.map((current) => {
          if (current.id === action.Id) {
            const newQte = current.qte - 1 > 0 ? current.qte - 1 : 1;
            return { ...current, qte: newQte };
          } else return current;
        }),
      ];

    default:
      return state;
  }
};

export default PizzaReducer;
