import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { useHttp } from "../../hooks/http.hook";
import { heroCreating, heroCreated, heroCreatingError } from "../../actions";

// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uuid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> сформировать на базе данных из фильтров (без Все)

const defaultValues = {
  name: "",
  description: "",
  element: "",
};

export const HeroesAddForm = () => {
  const elementOptions = useSelector((state) =>
    state.filters.filters.filter((option) => option.name !== "all")
  );

  const { request } = useHttp();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues, mode: "all" });

  const onSubmit = async (data) => {
    data.id = uuidv4();
    heroCreating();
    request("http://localhost:3001/heroes", "POST", JSON.stringify(data))
      .then((res) => {
        reset();
        heroCreated(res);
      })
      .catch(() => {
        console.log("Возникла ошибка создания");
        heroCreatingError();
      });
  };

  return (
    <form
      className="border p-4 shadow-lg rounded"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <div className="mb-4 position-relative">
        <label htmlFor="name" className="form-label fs-4">
          Имя нового героя
        </label>
        <input
          type="text"
          className="form-control"
          placeholder="Как меня зовут?"
          {...register("name", {
            required: "Заполните поле",
          })}
        />
        {errors.name && (
          <div className="position-absolute end-0 text-danger">
            {errors.name.message}
          </div>
        )}
      </div>

      <div className="mb-4 position-relative">
        <label htmlFor="text" className="form-label fs-4">
          Описание
        </label>
        <textarea
          className="form-control"
          placeholder="Что я умею?"
          style={{ height: "130px" }}
          {...register("description", {
            required: "Заполните поле",
          })}
        />
        {errors.description && (
          <div className="position-absolute end-0 text-danger">
            {errors.description.message}
          </div>
        )}
      </div>

      <div className="mb-5 position-relative">
        <label htmlFor="element" className="form-label">
          Выбрать элемент героя
        </label>
        <select
          required
          className="form-select"
          placeholder="cvegshv"
          {...register("element", {
            required: "Выберите один из элементов",
          })}
        >
          <option value="" disabled>
            Выбери элемент...
          </option>
          {elementOptions.map((option) => (
            <option key={option.name} value={option.name}>
              {option.label}
            </option>
          ))}
        </select>
        {errors.element && (
          <div className="position-absolute end-0 text-danger">
            {errors.element.message}
          </div>
        )}
      </div>

      <button type="submit" className="btn btn-primary">
        Создать
      </button>
    </form>
  );
};
