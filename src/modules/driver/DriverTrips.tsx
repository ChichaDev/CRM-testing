import { useEffect } from "react";
import { Table } from "react-bootstrap";

export const DriverTrips = () => {
  // // Сортируем поездки по дате
  // useEffect(() => {
  //   const sorted = [...trips].sort((a, b) => {
  //     const aDate = new Date(a.date).getTime();
  //     const bDate = new Date(b.date).getTime();
  //     return aDate - bDate;
  //   });
  //   setSortedTrips(sorted);
  // }, [trips]);

  return (
    <>
      <h2>Принятые поездки</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Дата та час</th>
            <th>Звідки</th>
            <th>Куди</th>
            <th>Кількість пасажирів</th>
            <th>Вартість квитка</th>
          </tr>
        </thead>
        <tbody>
          {/* {sortedTrips.map((trip) => (
            <tr key={trip.id}>
              <td>{trip.date}</td>
              <td>{trip.from}</td>
              <td>{trip.to}</td>
              <td>{trip.passengers}</td>
            </tr>
          ))} */}
        </tbody>
      </Table>
    </>
  );
};
