import {
  ADD_PRODUCT,
  TOGGLE_ACTIVE,
  DELETE_PRODUCT
} from "../actions/products";
import Product from "../../models/Product";
import { PRODUCTS } from "../../data/dummy-data";

const inicialState = {
  productsList: PRODUCTS,
  productsCounter: 3
};

const productsReducer = (state = inicialState, action) => {
  switch (action.type) {
    case ADD_PRODUCT:
      const product = new Product(
        state.productsCounter,
        action.catId,
        action.name
      );
      return {
        ...state,
        productsCounter: state.productsCounter + 1,
        productsList: state.productsList.concat(product)
      };
    case TOGGLE_ACTIVE:
      const idx = state.productsList.findIndex(pro => pro.id === action.proId);
      const productsList = state.productsList;
      productsList[idx].active = !productsList[idx].active;
      return {
        ...state,
        productsList
      };
    case DELETE_PRODUCT:
      return {
        ...state,
        productsList: state.productsList.filter(pro => pro.id !== action.proId)
      };
    default:
      return state;
  }
};

export default productsReducer;
