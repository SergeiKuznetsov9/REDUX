import {
  legacy_createStore as createStore,
  combineReducers,
  compose,
  applyMiddleware,
} from 'redux';


import { heroes } from "../reducers/heroes";
import { filters } from "../reducers/filters";

const stringMiddleware = 
// он автоматически получит созданный стор в качестве аргумента
// далее он вернет функцию, которая автоматически получит в качестве аргумента dispatch
// эта функция в свою очередь вернет следующую функцию, которая в качестве аргумента 
// автоматически получит action

// далее мы проверим тип этого action и в зависимости от результата совершим то или
// иное действие

// Таким образом, при вызове dispatch автоматически будет вызвана его переопределенная версия

// эта переопределенная версия в свою очередь будет вызывать следующий middleware, если он конечно же есть
// Поэтому этот переопределенный dispatch в документах называпется next

// чтобы вся эта цепочка заработала, все эти мидлвары нужно закинуть в функцию applyMiddleware

  (store) => (dispatch) => (action) => {
    if (typeof action === 'string') {
      return dispatch({
        type: action
      })
    }
    return dispatch(action)
  }

const store = createStore(
  combineReducers({heroes, filters}),

  applyMiddleware(stringMiddleware),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()



);

export default store;
