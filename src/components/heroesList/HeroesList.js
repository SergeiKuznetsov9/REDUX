import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { HeroesListItem } from "../heroesListItem/HeroesListItem";
import { Spinner } from "../spinner/Spinner";
import {
  filteredHeroesSelector,
  heroesLoadingStatusSelector,
} from "../../store/selectors/heroes-selectors";
import { removeHeroAsyncThunk } from "../../store/slices/heroesSlice";

export const HeroesList = () => {
  const dispatch = useDispatch();

  const heroesLoadingStatus = useSelector(heroesLoadingStatusSelector);

  const heroes = useSelector(filteredHeroesSelector);

  const onDelete = useCallback(
    (id) => {
      dispatch(removeHeroAsyncThunk({ id, heroes }));
    },

    [heroes, dispatch]
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
