import { useEffect } from "react";

import { useHttp } from "../../hooks/http.hook";
import { HeroesList } from "../heroesList/HeroesList";
import { HeroesFilters } from "../heroesFilters/HeroesFilters";
import { HeroesAddForm } from "../heroesAddForm/HeroesAddForm";
import {
  heroesFetched,
  heroesFetching,
  heroesFetchingError,
  optionsFetched,
} from "../../actions";
import "./app.scss";

export const App = () => {
  const { request } = useHttp();

  useEffect(() => {
    request("http://localhost:3001/filters")
      .then((data) => {
        optionsFetched(data);
      })
      .catch(() => console.log("Произошла ошибка загрузки"));

    heroesFetching();
    request("http://localhost:3001/heroes")
      .then((data) => heroesFetched(data))
      .catch(() => heroesFetchingError());

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
