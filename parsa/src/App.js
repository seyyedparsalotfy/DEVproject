import logo from "./logo.svg";
import React, { useState } from "react";

const ExampleComponent = () => {
  const data = {
    trip_financials: [
      {
        id: 2867462,
        request_datetime: "2022-04-20T17:08:36.465861+04:30",
        driver: "راننده تست",
        final_price: 40000,
        source_title: "تست میاره",
        hub: {
          id: 3115,
          title: "تهران",
        },
      },
      {
        id: 2867459,
        trip_id: 3207732,
        request_datetime: "2022-04-20T14:54:00.569765+04:30",
        driver: "راننده خورسند",
        final_price: 33000,
        source_title: "تست میاره ۲",
        hub: {
          id: 3115,
          title: "شیراز",
        },
      },
    ],
    payments: [
      {
        id: 199069,
        datetime: "2022-04-20T14:57:09.959629+04:30",
        amount: -100000,
        description: null,
      },
      {
        id: 199070,
        datetime: "2022-04-18T16:58:47.678934+04:30",
        amount: -7140000,
        description: null,
      },
    ],
  };

  const combinedData = [...data.trip_financials, ...data.payments];

  const groupedData = combinedData.reduce((acc, item) => {
    const date = new Date(item.datetime).toLocaleDateString();
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(item);
    return acc;
  }, {});

  const sortedDates = Object.keys(groupedData).sort(
    (a, b) => new Date(b).getTime() - new Date(a).getTime(),
  );

  const [filterType, setFilterType] = useState("");

  const filteredData = (filterType) => {
    if (filterType === "payment") {
      return combinedData.filter((item) => item.trip_id === undefined);
    } else if (filterType === "trip") {
      return combinedData.filter((item) => item.trip_id !== undefined);
    } else {
      return combinedData;
    }
  };

  return (
    <div>
      <div>
        <button onClick={() => setFilterType("payment")}>
          Filter by Payment
        </button>
        <button onClick={() => setFilterType("")}>Show All</button>
        <button onClick={() => setFilterType("trip")}>Filter by Trip</button>
      </div>
      {sortedDates.map((date) => (
        <div key={date}>
          <h3>{date}</h3>
          {filteredData(filterType).map((item) => {
            const itemDate = new Date(item.datetime).toLocaleDateString();
            if (itemDate === date) {
              return (
                <div key={item.id}>
                  {item.trip_id !== undefined ? (
                    <>
                      <p>Request datetime: {item.request_datetime}</p>
                      <p>Driver: {item.driver}</p>
                      <p>Final price: {item.final_price}</p>
                      <p>Source title: {item.source_title}</p>
                    </>
                  ) : (
                    <>
                      <p>Datetime: {item.datetime}</p>
                      <p>Amount: {item.amount}</p>
                      <p>Description: {item.description}</p>
                    </>
                  )}
                </div>
              );
            }
            return null;
          })}
        </div>
      ))}
    </div>
  );
};

export default ExampleComponent;
