import { Link } from "react-router-dom";

export const ErrorPage = () => {
  return (
    <div className="container text-center">
      <h1 className="display-4 my-5">Ошибка 404</h1>
      <p className="lead">Страница не найдена</p>
      <Link to="/tripspage" className="btn btn-primary mt-5">
        Вернуться на страницу поездок
      </Link>
    </div>
  );
};
