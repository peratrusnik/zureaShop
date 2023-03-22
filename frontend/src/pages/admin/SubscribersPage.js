import React from "react";
import { getSubscribers } from "../../services/user.service";
import { useEffect, useState } from "react";

const SubscribersPage = () => {
  const [subscribers, setSubscribers] = useState([]);

  useEffect(() => {
    getSubscribers()
      .then((response) => {
        console.log(response.data);
        setSubscribers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [setSubscribers]);

  const renderSubscribers = () => {
    if (subscribers.length) {
      return subscribers.map((subscriber, index) => {
        return (
          <tr key={subscriber._id}>
            <th scope="row">{index++}</th>
            <td>{subscriber?.email}</td>
            <td>{subscriber?.subscribedAt}</td>
          </tr>
        );
      });
    }
  };
  return (
    <div className="categoryDashboard">
      <>
        <h2>Subscribers</h2>

        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Subscriber Email</th>
              <th scope="col">Subscribed At</th>
            </tr>
          </thead>
          <tbody>{renderSubscribers()}</tbody>
        </table>
      </>
    </div>
  );
};

export default SubscribersPage;
