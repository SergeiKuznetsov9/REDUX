import { useCallback, useMemo } from "react";
import { useSelector } from "react-redux";

import {
  useDeleteHeroMutation,
  useGetHeroesQuery,
} from "../../store/rtkQuery/heroesQuerySlice";
import { activeFiltersSelector } from "../../store/selectors/filters-selectors";
import { HeroesListItem } from "../heroesListItem/HeroesListItem";
import { Spinner } from "../spinner/Spinner";

export const HeroesList = () => {
  const { data: heroes = [], isLoading, isError } = useGetHeroesQuery();
  const [deleteHero] = useDeleteHeroMutation();

  const activeFilters = useSelector(activeFiltersSelector);
  const filteredHeroes = useMemo(() => {
    if (activeFilters[0] === "all") {
      return heroes;
    }

    return heroes.filter((hero) => activeFilters.includes(hero.element));
  }, [activeFilters, heroes]);

  const onDelete = useCallback((id) => deleteHero(id), [deleteHero]);

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
  const elements = renderHeroesList(filteredHeroes);

  if (isLoading) return <Spinner />;
  if (isError) return <h5 className="text-center mt-5">Ошибка загрузки</h5>;
  return <ul>{elements}</ul>;
};
