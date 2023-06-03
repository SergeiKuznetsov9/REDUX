import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { useHttp } from "../../hooks/http.hook";
import { HeroesList } from "../heroesList/HeroesList";
import { HeroesFilters } from "../heroesFilters/HeroesFilters";
import { HeroesAddForm } from "../heroesAddForm/HeroesAddForm";
import { fetchFiltersThunk } from "../../store/thunk/filters-thunk";
import { fetchHeroesThunk } from "../../store/thunk/heroes-thunk";
import "./app.scss";

export const App = () => {
  const dispatch = useDispatch();
  const { request } = useHttp();

  useEffect(() => {
    dispatch(fetchFiltersThunk(request));
    dispatch(fetchHeroesThunk(request));

    // eslint-disable-next-line
  }, []);

  return (
    <main className="app">
      <div className="content">
        <HeroesList />
        <div className="content__interactive">
          <HeroesAddForm />
          <HeroesFilters />
        </div>
      </div>
    </main>
  );
};
