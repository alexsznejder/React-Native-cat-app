import { CATS } from "../../data/dummy-data";
import { SET_SELECTED_CAT_ID } from "../actions/cats";

const inicialState = {
  catsList: CATS,
  selectedCatId: undefined
};

const catsReducer = (state = inicialState, action) => {
  switch (action.type) {
    case SET_SELECTED_CAT_ID:
      return {
        ...state,
        selectedCatId: action.catId
      };
    default:
      return state;
  }
};

export default catsReducer;
