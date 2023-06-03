import {
  heroesFetching,
  heroesFetched,
  heroesFetchingError,
  heroCreating,
  heroCreated,
  heroCreatingError,
  heroRemoving,
  heroRemoved,
  heroRemovingError,
} from "../slices/heroesSlice";

export const fetchHeroesThunk = (request) => (dispatch) => {
  dispatch(heroesFetching());
  request("http://localhost:3001/heroes")
    .then((data) => dispatch(heroesFetched(data)))
    .catch(() => dispatch(heroesFetchingError()));
};

export const heroCreatingThunk =
  ({ request, data, reset }) =>
  (dispatch) => {
    dispatch(heroCreating());
    request("http://localhost:3001/heroes", "POST", JSON.stringify(data))
      .then((res) => {
        dispatch(heroCreated(res));
        reset();
      })
      .catch(() => {
        console.log("Возникла ошибка создания");
        dispatch(heroCreatingError());
      });
  };

export const heroRemovingThunk =
  ({ request, id, heroes }) =>
  (dispatch) => {
    dispatch(heroRemoving());
    request(`http://localhost:3001/heroes/${id}`, "DELETE")
      .then(() => {
        const newHeroesArray = heroes.filter((hero) => hero.id !== id);
        dispatch(heroRemoved(newHeroesArray));
      })
      .catch(() => {
        console.log("Произошла ошибка удаления");
        heroRemovingError();
      });
  };
