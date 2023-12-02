import React,{useState} from "react";
import "./Transaction.css";
import moment from "moment";
import { Button } from "../../components";

const Withdrawals = () => {
  const [withdrawHistory, setWithdrawHistory] = useState([]);
  const symbol = "R";

 

  return (
    <section>
      <div className="transaction_sect">
        <h2>All Withdrawal History</h2>
        <div className="transaction_table">
          <div className="transaction_table_head">
            <div className="date">
              <h3>Date/Time</h3>
            </div>
            <div className="type">
              <h3>Type</h3>
            </div>
            <div className="amount">
              <h3>Amount</h3>
            </div>
            <div className="status">
              <h3>Status</h3>
            </div>
            <div className="reference">
              <h3>Reference</h3>
            </div>
          </div>
          {withdrawHistory.map((item, index) => {
            const { createdAt, ref, status, type, amount } = item;

            let date = moment(createdAt).format("MMMM do yyyy, h:mm:ss a");
            return (
              <div key={index} className="transaction_table_body">
                <div className="date">
                  <p>{date}</p>
                </div>
                <div className="type">
                  <p>{type}</p>
                </div>
                <div className="amount">
                  <p>
                    {symbol}
                    {amount}
                  </p>
                </div>
                <div className="status">
                  <Button
                    title={status}
                    width={100}
                    height={30}
                    background={
                      status === "pending"
                        ? "#FFF3E7"
                        : status === "approved"
                        ? "#EDFFF9"
                        : ""
                    }
                    color={
                      status === "pending"
                        ? "#999DA1"
                        : status === "approved"
                        ? "27AE61"
                        : "#FC6121"
                    }
                  />
                </div>
                <div className="reference">
                  <p>{ref}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Withdrawals;
