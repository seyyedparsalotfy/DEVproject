import logo from "./logo.svg";

const TripFinancials = () => {
  const tripFinancialsData = [
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
  ];

  const paymentsData = [
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
  ];

  // Combine trip financials and payments data
  const combinedData = tripFinancialsData.concat(paymentsData);

  // Sort the combined data by datetime from new to old
  const sortedData = combinedData.sort(
    (a, b) =>
      new Date(b.request_datetime || b.datetime) -
      new Date(a.request_datetime || a.datetime),
  );

  // Group the data by date
  const groupedData = sortedData.reduce((acc, data) => {
    const date = new Date(
      data.request_datetime || data.datetime,
    ).toLocaleDateString();
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push(data);
    return acc;
  }, {});

  return (
    <div>
      {Object.entries(groupedData).map(([date, entries]) => (
        <div key={date}>
          <h4>Date: {date}</h4>
          {entries.map((entry) => (
            <div key={entry.id}>
              {entry.request_datetime && (
                <>
                  <h4>Request DateTime: {entry.request_datetime}</h4>
                  <p>Driver: {entry.driver}</p>
                  <p>Final Price: {entry.final_price}</p>
                  <p>Source Title: {entry.source_title}</p>
                  <p>Hub Title: {entry.hub.title}</p>
                </>
              )}
              {entry.datetime && (
                <>
                  <h4>Payment DateTime: {entry.datetime}</h4>
                  <p>Amount: {entry.amount}</p>
                  <p>Description: {entry.description}</p>
                </>
              )}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default TripFinancials;
