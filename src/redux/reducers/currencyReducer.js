import { SET_CURRENCY } from "../actions/currencyActions";

const initState = {
  currencySymbol: "VND",
  currencyName: "VND",
  currencyRate: 20000,
};

const currencyReducer = (state = initState, action) => {
  if (action.type === SET_CURRENCY) {
    const currencyName = action.payload.currencyName;

    if (currencyName === "USD") {
      return {
        ...state,
        currencySymbol: "$",
        currencyRate: action.payload.currencyRate,
        currencyName,
      };
    }
    if (currencyName === "VND") {
      return {
        ...state,
        currencySymbol: "VND",
        currencyRate: action.payload.currencyRate,
        currencyName,
      };
    }
  }
  return state;
};

export default currencyReducer;
