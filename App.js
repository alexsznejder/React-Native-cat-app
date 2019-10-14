import React from "react";
import { combineReducers, createStore } from "redux";
import { Provider } from "react-redux";
import MainNavigation from "./navigation/MainNavigation";
import catsReducer from "./store/reducers/cats";
import productsReducer from "./store/reducers/products";
import datesReducer from "./store/reducers/dates";

const rootReducer = combineReducers({
  cats: catsReducer,
  products: productsReducer,
  dates: datesReducer
});

const store = createStore(rootReducer);

export default function App() {
  return (
    <Provider store={store}>
      <MainNavigation />
    </Provider>
  );
}
