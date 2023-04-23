import { useState } from "react";
import { Button } from "react-bootstrap";
import { Trips } from "../types";
import moment from "moment";

type SortOrder = "asc" | "desc";

type SortProps = {
  trips: Trips[];
  sortOrder: SortOrder;
  onSort: (sortedTrips: Trips[], sortOrder: SortOrder) => void;
};

export const SortByDate = (params: SortProps) => {
  const { trips, sortOrder, onSort } = params;

  const [ascending, setAscending] = useState(true);

  const handleClick = () => {
    const sortedTrips = trips.sort((a, b) => {
      if (sortOrder === "asc") {
        return moment(a.date).diff(moment(b.date));
      } else {
        return moment(b.date).diff(moment(a.date));
      }
    });

    setAscending(!ascending);
    onSort(sortedTrips, ascending ? "asc" : "desc");
  };

  return (
    <div>
      <span>Сортувати за датою: </span>
      <Button variant="link" onClick={handleClick}>
        {sortOrder === "asc" ? "▲" : "▼"}
      </Button>
    </div>
  );
};
