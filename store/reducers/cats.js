import Cat from "../../models/Cat";

import {
  SET_SELECTED_CAT_ID,
  ADD_CAT,
  DELETE_CAT,
  GET_CATS,
  EDIT_CAT
} from "../actions/cats";

const inicialState = {
  catsList: [],
  selectedCatId: undefined
};

const catsReducer = (state = inicialState, action) => {
  switch (action.type) {
    case GET_CATS:
      return {
        ...state,
        catsList: action.cats
      };
    case ADD_CAT:
      const cat = new Cat(
        action.payload.id,
        action.payload.name,
        action.payload.sex,
        action.payload.birthday,
        action.payload.breed,
        action.payload.sterilised,
        action.payload.weight,
        action.payload.image
      );
      return {
        ...state,
        catsList: state.catsList.concat(cat)
      };
    case EDIT_CAT:
      const idx = state.catsList.findIndex(
        cat => cat.id === action.payload.catId
      );
      const catsList = state.catsList;
      catsList[idx].name = action.payload.name;
      catsList[idx].sex = action.payload.sex;
      catsList[idx].birthday = action.payload.birthday;
      catsList[idx].breed = action.payload.breed;
      catsList[idx].sterilised = action.payload.sterilised;
      catsList[idx].weight = action.payload.weight;
      catsList[idx].image = action.payload.image;
      return {
        ...state,
        catsList
      };
    case DELETE_CAT:
      return {
        ...state,
        catsList: state.catsList.filter(cat => cat.id !== action.payload)
      };
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
