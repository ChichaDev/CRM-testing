import { Link } from "react-router-dom";

export const ErrorPage = () => {
  return (
    <div className="container text-center">
      <h1 className="display-4 my-5">Помилка 404</h1>
      <p className="lead">Сторінка не знайдена</p>
      <Link to="/profile/dashboard" className="btn btn-primary mt-5">
        Повернутися до профілю
      </Link>
    </div>
  );
};
