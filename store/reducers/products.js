import {
  GET_PRODUCTS,
  ADD_PRODUCT,
  TOGGLE_ACTIVE,
  DELETE_PRODUCT
} from "../actions/products";
import Product from "../../models/Product";

const inicialState = {
  productsList: []
};

const productsReducer = (state = inicialState, action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return {
        ...state,
        productsList: action.products
      };
    case ADD_PRODUCT:
      const product = new Product(
        action.productData.id,
        action.productData.catId,
        action.productData.name,
        action.productData.active
      );
      return {
        ...state,
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
