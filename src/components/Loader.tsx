import { Spinner } from "react-bootstrap";

export const Loader = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Spinner animation="border" role="status">
        <span className="sr-only">Завантаження...</span>
      </Spinner>
    </div>
  );
};
