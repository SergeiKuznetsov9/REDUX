import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { useHttp } from "../../hooks/http.hook";
import { heroCreatingThunk } from "../../store/thunk/heroes-thunk";
import { elementOptionsSelector } from "../../store/selectors/heroes-selectors";

const defaultValues = {
  name: "",
  description: "",
  element: "",
};

export const HeroesAddForm = () => {
  const dispatch = useDispatch();
  const { request } = useHttp();

  const elementOptions = useSelector(elementOptionsSelector);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ defaultValues, mode: "all" });

  const onSubmit = async (data) => {
    data.id = uuidv4();

    dispatch(heroCreatingThunk({ request, data, reset }));
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
