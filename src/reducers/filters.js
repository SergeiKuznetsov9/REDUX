const initialState = {
    filters: [],
    activeFilters: ["all"],
  };
  
  export const filters = (state = initialState, action) => {
    switch (action.type) {
      case "ELEMENT_OPTIONS_FETCHED":
        return {
          ...state,
          filters: action.payload,
        };
  
      case "TOGGLE_FILTER":
        return {
          ...state,
          activeFilters: action.payload,
        };
  
      default:
        return state;
    }
  };
  