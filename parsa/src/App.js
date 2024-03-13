import logo from "./logo.svg";

const TripData = () => {
  // Sample trip_financials and payments data
  const trip_financials = [
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

  const payments = [
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

  // Combine trip_financials and payments into a single array
  const allData = [...trip_financials, ...payments];

  // Sort allData by datetime in ascending order
  allData.sort((a, b) => new Date(a.datetime) - new Date(b.datetime));

  return (
    <div>
      {allData.map((data) => (
        <div key={data.id}>
          {data.request_datetime && (
            <>
              <p>Request Datetime: {data.request_datetime}</p>
              <p>Driver: {data.driver}</p>
              <p>Final Price: {data.final_price}</p>
              <p>Source Title: {data.source_title}</p>
              <p>Hub Title: {data.hub.title}</p>
            </>
          )}
          {data.datetime && (
            <>
              <p>Payment Datetime: {data.datetime}</p>
              <p>Amount: {data.amount}</p>
              <p>Description: {data.description}</p>
            </>
          )}
          <hr />
        </div>
      ))}
    </div>
  );
};

export default TripData;
