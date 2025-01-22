const filterReducer = (state = "", action) => {
  console.log("ACTION: ", action);
  switch (action.type) {
    case "SET_FILTER":
      return action.payload.filter;
    default:
      return state;
  }
};

// action creator - function that returns an action object
export const filterChange = (filter) => {
  return {
    type: "SET_FILTER",
    payload: { filter },
  };
};

export default filterReducer;
