import { legacy_createStore as createStore, bindActionCreators } from 'redux';
import { reducer } from './reducer';
/* import { inc, dec, rnd } from './actions' */

import * as actions from './actions'

const store = createStore(reducer)

const {dispatch, subscribe, getState} = store;

const update = () => {
  document.getElementById('counter').textContent = getState().value;
};

subscribe(update);

// создадим функции, которые сами будут диспатчить что нужно:

  // const incDispatch = () => dispatch(inc())
  // const decDispatch = () => dispatch(dec())
  // const rndDispatch = (value) => dispatch(rnd(value))



// сделаем тоже самое что и на предыдущем шаге, но при помощи заранее созданной
// универсальной функции bindActionCreator:

// Вызов bindActionCreator вернет функцию, которая будет принимать любой количество агрументов
// и диспачить с ними переданный ей creator. Суть того, что она вернет будет такая же как и в примере\
// выше:

/* 
  const bindActionCreator = (creator, dispatch) =>
    (...args) => {
      dispatch(creator(...args))
    }

    const incDispatch = bindActionCreator(inc, dispatch)
    const decDispatch = bindActionCreator(dec, dispatch)
    const rndDispatch = bindActionCreator(rnd, dispatch)
 */

  // Вот это вот, на самом деле, иллюстрация существующего в redux метода bindActionCreators,
  // который делает все тоже самое
/* 
    const incDispatch = bindActionCreators(inc, dispatch)
    const decDispatch = bindActionCreators(dec, dispatch)
    const rndDispatch = bindActionCreators(rnd, dispatch)
 */

    // Прикол этого метода в том, что он в качестве первого аргумента может принимать объект
    // И в таком случае он вернет объект криэйторов:
/* 
    const {incDispatch, decDispatch, rndDispatch} = bindActionCreators({
      incDispatch: inc,
      decDispatch: dec,
      rndDispatch: rnd,
    }, dispatch)
 */

    // правильно импортировав экшены, можно неимерверно сокартить код:
    const {inc, dec, rnd} = bindActionCreators(actions, dispatch)



document.getElementById('inc').addEventListener('click', inc);
document.getElementById('dec').addEventListener('click', dec);
document.getElementById('rnd').addEventListener('click', () => {
  const value = Math.floor(Math.random() * 10);
  rnd(value);
});

