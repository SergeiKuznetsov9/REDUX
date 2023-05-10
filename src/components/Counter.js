import { useDispatch, useSelector } from "react-redux";
import {inc, dec, rnd} from '../actions'

export const Counter = () => {

  // получаем значениен из глобального стэйта
  const counter = useSelector( state => state.value)


  // достаем dispatch для работы с редьюсером
  const dispatch = useDispatch()


  return (
    <div className="jumbotron">
      <h1>{counter}</h1>
      <button onClick={() => dispatch(dec())} className="btn btn-primary">
        DEC
      </button>
      <button onClick={() => dispatch(inc())} className="btn btn-primary">
        INC
      </button>
      <button onClick={() => dispatch(rnd())} className="btn btn-primary">
        RND
      </button>
    </div>
  );
};
