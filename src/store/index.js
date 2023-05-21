import { legacy_createStore as createStore, combineReducers } from "redux";
import { heroes } from "../reducers/heroes";
import { filters } from "../reducers/filters";

const enhancer = 
  (createStore1) => {
  return (...args) => {
  const store = createStore1(...args);

  const oldDispatch = store.dispatch;
  store.dispatch = (action) => {
    if(typeof action === 'string') {
      return oldDispatch({
        type: action
      })
    }
    return oldDispatch(action)
  }
  return store
}}

const store = createStore(
  combineReducers({heroes, filters}),

  // enhancer представляет собой функцию, которая в качестве аргумента принимает 
  // функцию createStore и возвращает другую функцию, создающую модифицированный стор
  // при передаче его сюда, это все автоматически обрабатывается, createStore прокидывается 
  // автоматически
  enhancer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
