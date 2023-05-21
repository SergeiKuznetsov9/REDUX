import { useCallback } from "react";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";

import { useHttp } from "../../hooks/http.hook";
import { HeroesListItem } from "../heroesListItem/HeroesListItem";
import { heroRemoving, heroRemoved, heroRemovingError } from "../../actions";
import { Spinner } from "../spinner/Spinner";


// Задача для этого компонента:
// При клике на "крестик" идет удаление персонажа из общего состояния
// Усложненная задача:
// Удаление идет и с json файла при помощи метода DELETE

export const HeroesList = () => {

  const { heroesLoadingStatus } = useSelector((state) => state.heroes);

  const filteredHeroesSelector = createSelector(
    state => state.filters.activeFilters,
    state => state.heroes.heroes,
    (filters, heroes) => {
      if (filters[0] === "all") {
        return heroes;
      }  
      return heroes.filter((hero) => filters.includes(hero.element));
    }
  )

  const heroes = useSelector(filteredHeroesSelector);

  const { request } = useHttp();

  const onDelete = useCallback(
    (id) => {
      heroRemoving();
      request(`http://localhost:3001/heroes/${id}`, "DELETE")
        .then(() => {
          const newHeroesArray = heroes.filter((hero) => hero.id !== id);
          heroRemoved(newHeroesArray);
        })
        .catch(() => {
          console.log("Произошла ошибка удаления");
          heroRemovingError();
        });
    },

    [request, heroes]
  );

  if (heroesLoadingStatus === "loading") {
    return <Spinner />;
  } else if (heroesLoadingStatus === "error") {
    return <h5 className="text-center mt-5">Ошибка загрузки</h5>;
  }

  const renderHeroesList = (arr) => {
    if (arr.length === 0) {
      return <h5 className="text-center mt-5">Героев пока нет</h5>;
    }

    return arr.map(({ id, ...props }) => {
      return (
        <HeroesListItem key={id} {...props} onDelete={() => onDelete(id)} />
      );
    });
  };

  const elements = renderHeroesList(heroes);
  return <ul>{elements}</ul>;
};
