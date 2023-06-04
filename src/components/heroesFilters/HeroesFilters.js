import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";
import { addFilterThunk } from "../../store/thunk/filters-thunk";
import { activeFiltersSelector } from "../../store/selectors/filters-selectors";
import { useGetFiltersQuery } from "../../store/rtkQuery/filtersQuerySlice";

export const HeroesFilters = () => {
  const { data: elements = [] } = useGetFiltersQuery();
  const activeFilters = useSelector(activeFiltersSelector);
  const dispatch = useDispatch();

  const addFilter = (filterName) => {
    dispatch(addFilterThunk({ filterName, activeFilters }));
  };

  return (
    <div className="card shadow-lg mt-4">
      <div className="card-body">
        <p className="card-text">Отфильтруйте героев по элементам</p>
        <div className="btn-group">
          {elements.map((element) => (
            <button
              key={element.name}
              className={classNames(`btn ${element.className}`, {
                active: activeFilters.includes(element.name),
              })}
              onClick={() => addFilter(element.name)}
            >
              {element.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
