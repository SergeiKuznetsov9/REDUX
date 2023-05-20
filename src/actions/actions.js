export const heroesFetching = () => ({
  type: "HEROES_FETCHING",
});

export const heroesFetched = (heroes) => ({
  type: "HEROES_FETCHED",
  payload: heroes,
});

export const heroesFetchingError = () => ({
  type: "HEROES_FETCHING_ERROR",
});

export const optionsFetched = (options) => ({
  type: "ELEMENT_OPTIONS_FETCHED",
  payload: options,
});

export const heroCreating = () => ({
  type: "HERO_CREATING",
});

export const heroCreated = (hero) => ({
  type: "HERO_CREATED",
  payload: hero,
});

export const heroCreatingError = () => ({
  type: "HERO_CREATING_ERROR",
});

export const heroRemoving = () => ({
  type: "HERO_REMOVING",
});

export const heroRemoved = (heroes) => ({
  type: "HERO_REMOVED",
  payload: heroes,
});

export const heroRemovingError = () => ({
  type: "HERO_REMOVING_ERROR",
});

export const toggleFilter = (filter) => ({
  type: "TOGGLE_FILTER",
  payload: filter,
});
