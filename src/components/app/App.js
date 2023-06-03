import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { HeroesList } from "../heroesList/HeroesList";
import { HeroesFilters } from "../heroesFilters/HeroesFilters";
import { HeroesAddForm } from "../heroesAddForm/HeroesAddForm";
import "./app.scss";
import { fetchHeroesAsyncThunk } from "../../store/slices/heroesSlice";
import { fetchFiltersAsyncThunk } from "../../store/slices/filtersSlice";

export const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchFiltersAsyncThunk());
    dispatch(fetchHeroesAsyncThunk());

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
