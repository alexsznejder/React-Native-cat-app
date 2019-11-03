import React from "react";
import { combineReducers, createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import MainNavigation from "./navigation/MainNavigation";
import catsReducer from "./store/reducers/cats";
import productsReducer from "./store/reducers/products";
import datesReducer from "./store/reducers/dates";
import ReduxThunk from "redux-thunk";

const rootReducer = combineReducers({
  cats: catsReducer,
  products: productsReducer,
  dates: datesReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  return (
    <Provider store={store}>
      <MainNavigation />
    </Provider>
  );
}
