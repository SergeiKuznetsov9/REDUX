import { useSelector } from "react-redux";
import classNames from "classnames";
import { toggleFilter } from "../../actions";

// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active

export const HeroesFilters = () => {
  const { filters, activeFilters } = useSelector((state) => state.filters);

  const addFilter = (filterName) => {
    if (filterName === "all") {
      toggleFilter(["all"]);
      return;
    }

    const newActiveFilters = activeFilters.filter(
      (filter) => filter !== "all" && filter !== filterName
    );

    if (activeFilters.indexOf(filterName) === -1)
      newActiveFilters.push(filterName);

    if (!newActiveFilters.length) newActiveFilters.push("all");

    toggleFilter(newActiveFilters);
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
