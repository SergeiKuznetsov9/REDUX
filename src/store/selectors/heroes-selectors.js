export const elementOptionsSelector = (state) =>
  state.filtersReducer.filters.filter((option) => option.name !== "all");

export const heroesLoadingStatusSelector = (state) =>
  state.heroesReducer.heroes.heroesLoadingStatus;

export const filteredHeroesSelector = (state) => {
  const activeFilters = state.filtersReducer.activeFilters;
  const heroes = state.heroesReducer.heroes;
  if (activeFilters[0] === "all") {
    return heroes;
  }
  return heroes.filter((hero) => activeFilters.includes(hero.element));
};
