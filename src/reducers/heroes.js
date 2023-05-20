const initialState = {
    heroes: [],
    heroesLoadingStatus: "idle",
    heroCreatingStatus: "idle",
    heroRemovingStatus: "idle",
  };
  
  export const heroes = (state = initialState, action) => {
    switch (action.type) {

        case "HEROES_FETCHING":
        return {
          ...state,
          heroesLoadingStatus: "loading",
        };
      case "HEROES_FETCHED":
        return {
          ...state,
          heroes: action.payload,
          heroesLoadingStatus: "idle",
        };
      case "HEROES_FETCHING_ERROR":
        return {
          ...state,
          heroesLoadingStatus: "error",
        };
  
      case "HERO_CREATING":
        return {
          ...state,
          heroCreatingStatus: "loading",
        };
      case "HERO_CREATED":
        return {
          ...state,
          heroes: [...state.heroes, action.payload],
          heroCreatingStatus: "idle",
        };
      case "HERO_CREATING_ERROR":
        return {
          ...state,
          heroCreatingStatus: "error",
        };
  
      case "HERO_REMOVING":
        return {
          ...state,
          heroRemovingStatus: "loading",
        };
      case "HERO_REMOVED":
        return {
          ...state,
          heroes: [...action.payload],
          heroRemovingStatus: "idle",
        };
      case "HERO_REMOVING_ERROR":
        return {
          ...state,
          heroRemovingStatus: "error",
        };
  
      default:
        return state;
    }
  };
  