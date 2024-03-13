import logo from "./logo.svg";
import "./App.css";

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
    {
      id: 2867467,
      request_datetime: "2022-04-21T09:30:00.000000+04:30",
      driver: "راننده تست ۳",
      final_price: 50000,
      source_title: "تست میاره ۳",
      hub: {
        id: 3115,
        title: "تهران",
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
      id: 199071,
      datetime: "2022-04-20T16:30:00.000000+04:30",
      amount: -50000,
      description: null,
    },
    {
      id: 199073,
      datetime: "2022-04-21T10:00:00.000000+04:30",
      amount: -20000,
      description: null,
    },
  ],
};

const arrangeDataByDay = (data) => {
  // Combine both trip_financials and payments into a single array
  const combinedData = [...data.trip_financials, ...data.payments];

  // Sort the combinedData array based on the datetime property in ascending order
  const sortedData = combinedData.sort((a, b) => {
    return (
      new Date(a.datetime || a.request_datetime) -
      new Date(b.datetime || b.request_datetime)
    );
  });

  // Group the sortedData by day and convert it into an object
  const groupedData = sortedData.reduce((acc, item) => {
    const date = new Date(
      item.datetime || item.request_datetime,
    ).toLocaleDateString();
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(item);
    return acc;
  }, {});

  return groupedData;
};

const App = () => {
  const groupedData = arrangeDataByDay(data);

  return (
    <div>
      <h1>Arranged Data:</h1>
      {Object.entries(groupedData).map(([date, presentations]) => (
        <div key={date}>
          <h2>{date}</h2>
          {presentations.map((item) => (
            <div key={item.id}>
              <p>
                <strong>ID: </strong>
                {item.id}
              </p>
              {item.driver && (
                <>
                  <p>
                    <strong>Driver: </strong>
                    {item.driver}
                  </p>
                  <p>
                    <strong>Final Price: </strong>
                    {item.final_price}
                  </p>
                </>
              )}
              {item.amount && (
                <p>
                  <strong>Amount: </strong>
                  {item.amount}
                </p>
              )}
              {item.source_title && (
                <p>
                  <strong>Source Title: </strong>
                  {item.source_title}
                </p>
              )}
              {item.hub && (
                <p>
                  <strong>Hub ID: </strong>
                  {item.hub.id}
                </p>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
export default App;
