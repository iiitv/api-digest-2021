const initState = {
    popular: [],
    newGames: [],
    upcoming: [],
    searched: [],
  };
  
  const gamesReducer = (state = initState, action) => {
    switch (action.type) {
      case "FETCH_GAMES":
        return {
          ...state,
          popular: action.payload.popular,
          upcoming: action.payload.upcoming,
          newGames: action.payload.newGames,
        };
      case "FETCH_SEARCHED":
        return {
          ...state,
          searched: action.payload.searched,
        };
      case "CLEAR_SEARCHED":
        return {
          ...state,
          searched: [],
        };
      default:
        return { ...state };
    }
  };

  // Action - object which describes what we are going to do
// Dispatch - sends action to the reducer to modify the data
// Action creator - function which returns an action
// redux thunk -allows asynchronous fetching of data

  export default gamesReducer;
