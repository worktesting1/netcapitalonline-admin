import React, { useEffect, useState } from "react";
import "./Transaction.css";
import moment from "moment";
import { Button } from "../../components";
import { useGlobalContext } from "../../context/context";

const Withdrawals = () => {
  const symbol = "R";
  const { getWithdrawals, withdrawHistory } = useGlobalContext();
  const adminToken = JSON.parse(sessionStorage.getItem("adminToken"));

  useEffect(() => {
    getWithdrawals(adminToken);
  }, []);

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
              <h3>Name</h3>
            </div>
            <div className="amount">
              <h3>Amount</h3>
            </div>
            <div className="status">
              <h3>Status</h3>
            </div>
            <div className="reference">
              <h3>Bank Name</h3>
            </div>
            <div className="reference">
              <h3>Reference</h3>
            </div>
          </div>
          {withdrawHistory.map((item, index) => {
            const { createdAt, accountName, status, bankName, amount } = item;

            let date = moment(createdAt).format("MMMM do yyyy, h:mm:ss a");
            return (
              <div key={index} className="transaction_table_body">
                <div className="date">
                  <p>{date}</p>
                </div>
                <div className="type">
                  <p>{accountName}</p>
                </div>
                <div className="amount">
                  <p>
                    {symbol}
                    {amount}
                  </p>
                </div>
                <div className="status">
                  <Button
                    title={status ? "Approved" : "Pending"}
                    width={100}
                    height={30}
                    background={!status ? "#FFF3E7" : "#EDFFF9"}
                    color={!status ? "#999DA1" : "27AE61"}
                  />
                </div>
                <div className="reference">
                  <p>{bankName}</p>
                </div>
                <div className="reference">
                  <p>{bankName}</p>
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
