import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { legacy_createStore as createStore } from 'redux';

// Для использования Редакс устанавливаем два пакета react-redux и redux

// Задаем начальное значение стэйта:

/*
  const initialState = 1;
*/

// Далее создаем редьюсер. Он должен принимать стэйт и экшн. Это обычная функция, которая
// определяет логику работы со стэйтом. Она дальше будет использоваться в создании стора


/* 
  const reducer = (state = initialState, action) => {
    switch (action.type) {
      case 'INC':
        return state + 1;
      case 'DEC':
        return state - 1;
      case 'RND':
        return state * action.payload;
      default:
        return state;
    }
  };
 */


// После этого можем начать работать с редаксом. Для этого создаем стор.
// Стор создается методом редакса createStore, в который нужно прокинуть редьюсер:

/* 
const store = createStore(reducer)
 */

// Теперь стор создан, в нем есть различные методы, можно глянуть через console
// Один из важных - getState()
// Другой важный  - dispatch() - позволяет запускать reducer для изменения стэйта
// Следующим кодом мы запустим reducer с типом 'INC' и значение стэйта увеличится на 1

/* 
  store.dispatch({type: 'INC'})
  console.log(store.getState())
 */

// НО реагирования UI в нативном JS никакого не будет. Для отслеживания изменения у стора
// существует метод subscribe, который принимает колбэк (без аргументов)
/* 
  store.subscribe(() => console.log(store.getState()))
  store.dispatch({type: 'INC'})
  store.dispatch({type: 'INC'})
 */

// подключим методы редьюсера к кнопкам и в подписке будем обновлять значения счетчика:
/* 
  const update = () => {
    document.getElementById('counter').textContent = store.getState();
  };
  store.subscribe(update);


  document.getElementById('inc').addEventListener('click', () => {
    store.dispatch({ type: 'INC' });
  });

  document.getElementById('dec').addEventListener('click', () => {
    store.dispatch({ type: 'DEC' });
  });

  document.getElementById('rnd').addEventListener('click', () => {
    const value = Math.floor(Math.random() * 10);
    store.dispatch({ type: 'RND', payload: value });
  });
 */

// То, что написано выше - можно улучшить путем создания функций-криэйторов:
/* 
  const inc = () => ({ type: 'INC' });
  const dec = () => ({ type: 'DEC' });
  const rnd = (value) => ({ type: 'RND', payload: value });

  const update = () => {
    document.getElementById('counter').textContent = store.getState();
  };
  store.subscribe(update);

  document.getElementById('inc').addEventListener('click', () => {
    store.dispatch(inc());
  });

  document.getElementById('dec').addEventListener('click', () => {
    store.dispatch(dec());
  });

  document.getElementById('rnd').addEventListener('click', () => {
    const value = Math.floor(Math.random() * 10);
    store.dispatch(rnd(value));
  });
*/















// Ниже приведено все тоже самое, только в работе с объектом

const initialState = {value: 1};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INC':
      return {...state, value: state.value + 1 };
    case 'DEC':
      return {...state, value: state.value - 1 };
    case 'RND':
      return {...state, value: state.value * action.payload };
    default:
      return state;
  }
};
const store = createStore(reducer)
const inc = () => ({ type: 'INC' });
const dec = () => ({ type: 'DEC' });
const rnd = (value) => ({ type: 'RND', payload: value });

const update = () => {
  document.getElementById('counter').textContent = store.getState().value;
};
store.subscribe(update);

document.getElementById('inc').addEventListener('click', () => {
  store.dispatch(inc());
});

document.getElementById('dec').addEventListener('click', () => {
  store.dispatch(dec());
});

document.getElementById('rnd').addEventListener('click', () => {
  const value = Math.floor(Math.random() * 10);
  store.dispatch(rnd(value));
});


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<StrictMode></StrictMode>);