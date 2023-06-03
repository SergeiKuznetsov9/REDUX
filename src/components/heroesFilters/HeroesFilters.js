import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";
import { addFilterThunk } from "../../store/thunk/filters-thunk";
import {
  activeFiltersSelector,
  filtersSelector,
} from "../../store/selectors/filters-selectors";

export const HeroesFilters = () => {
  const dispatch = useDispatch();
  const filters = useSelector(filtersSelector);
  const activeFilters = useSelector(activeFiltersSelector);

  const addFilter = (filterName) => {
    dispatch(addFilterThunk({ filterName, activeFilters }));
  };

  return (
    <div className="card shadow-lg mt-4">
      <div className="card-body">
        <p className="card-text">Отфильтруйте героев по элементам</p>
        <div className="btn-group">
          {filters.map((filter) => (
            <button
              key={filter.name}
              className={classNames(`btn ${filter.className}`, {
                active: activeFilters.includes(filter.name),
              })}
              onClick={() => addFilter(filter.name)}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
