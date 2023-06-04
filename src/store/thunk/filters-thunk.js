import { toggleFilter } from "../slices/filtersSlice";

export const addFilterThunk =
  ({ filterName, activeFilters }) =>
  (dispatch) => {
    if (filterName === "all") {
      dispatch(toggleFilter(["all"]));
      return;
    }

    const newActiveFilters = activeFilters.filter(
      (filter) => filter !== "all" && filter !== filterName
    );

    if (activeFilters.indexOf(filterName) === -1)
      newActiveFilters.push(filterName);

    if (!newActiveFilters.length) newActiveFilters.push("all");

    dispatch(toggleFilter(newActiveFilters));
  };
