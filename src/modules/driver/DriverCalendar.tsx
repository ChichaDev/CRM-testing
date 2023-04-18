import { useEffect, useState } from "react";
import "./calendar.css";

export const DriverCalendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const previousMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    );
  };

  const nextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    );
  };

  useEffect(() => {
    // Обновляем заголовок календаря при изменении месяца
    const title = document.querySelector("#calendar-title");
    if (title) {
      title.textContent = currentMonth.toLocaleDateString("ru", {
        year: "numeric",
        month: "long",
      });
    }
  }, [currentMonth]);

  const calendarCells = [];
  const currentMonthDays = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  ).getDate();
  const currentMonthFirstDay = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  ).getDay();

  // Добавляем пустые ячейки перед первым днем месяца
  for (let i = 0; i < currentMonthFirstDay; i++) {
    calendarCells.push(
      <div key={`empty-${i}`} className="calendar-cell"></div>
    );
  }

  // Добавляем ячейки для всех дней месяца
  for (let i = 1; i <= currentMonthDays; i++) {
    calendarCells.push(
      <div key={`day-${i}`} className="calendar-cell">
        {i}
      </div>
    );
  }

  // Добавляем пустые ячейки после последнего дня месяца
  const currentMonthLastDay = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    currentMonthDays
  ).getDay();
  for (let i = currentMonthLastDay + 1; i < 7; i++) {
    calendarCells.push(
      <div key={`empty-${i}`} className="calendar-cell"></div>
    );
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <div className="row justify-content-between">
                <div className="col-4">
                  <button className="btn btn-link" onClick={previousMonth}>
                    &lt;
                  </button>
                </div>
                <div className="col-4">
                  <h2 id="calendar-title">
                    {currentMonth.toLocaleDateString("ru", {
                      year: "numeric",
                      month: "long",
                    })}
                  </h2>
                  {/* <h2>Май 2023</h2> */}
                </div>
                <div className="col-4 text-right">
                  <button className="btn btn-link" onClick={nextMonth}>
                    &gt;
                  </button>
                </div>
              </div>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col">
                  <div className="calendar-row">
                    <div className="calendar-cell">Пн</div>
                    <div className="calendar-cell">Вт</div>
                    <div className="calendar-cell">Ср</div>
                    <div className="calendar-cell">Чт</div>
                    <div className="calendar-cell">Пт</div>
                    <div className="calendar-cell">Сб</div>
                    <div className="calendar-cell">Вс</div>
                  </div>
                  <div className="calendar-body">
                    <div className="calendar-row">
                      <div className="calendar-cell">1</div>
                      <div className="calendar-cell">2</div>
                      <div className="calendar-cell">3</div>
                      <div className="calendar-cell">4</div>
                      <div className="calendar-cell">5</div>
                      <div className="calendar-cell">6</div>
                      <div className="calendar-cell">7</div>
                    </div>
                    <div className="calendar-row">
                      <div className="calendar-cell">8</div>
                      <div className="calendar-cell">9</div>
                      <div className="calendar-cell">10</div>
                      <div className="calendar-cell">11</div>
                      <div className="calendar-cell">12</div>
                      <div className="calendar-cell">13</div>
                      <div className="calendar-cell">14</div>
                    </div>
                    <div className="calendar-row">
                      <div className="calendar-cell">15</div>
                      <div className="calendar-cell">16</div>
                      <div className="calendar-cell">17</div>
                      <div className="calendar-cell">18</div>
                      <div className="calendar-cell">19</div>
                      <div className="calendar-cell">20</div>
                      <div className="calendar-cell">21</div>
                    </div>
                    <div className="calendar-row">
                      <div className="calendar-cell">22</div>
                      <div className="calendar-cell">23</div>
                      <div className="calendar-cell">24</div>
                      <div className="calendar-cell">25</div>
                      <div className="calendar-cell">26</div>
                      <div className="calendar-cell">27</div>
                      <div className="calendar-cell">28</div>
                    </div>
                    <div className="calendar-row">
                      <div className="calendar-cell">29</div>
                      <div className="calendar-cell">30</div>
                      <div className="calendar-cell"></div>
                      <div className="calendar-cell"></div>
                      <div className="calendar-cell"></div>
                      <div className="calendar-cell"></div>
                      <div className="calendar-cell"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
