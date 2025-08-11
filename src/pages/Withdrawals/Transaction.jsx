import React, { useEffect } from "react";
import "./Transaction.css";
import moment from "moment";
import { Button } from "../../components";
import { useGlobalContext } from "../../context/context";
import { ColorRing } from "react-loader-spinner";

const Deposits = () => {
  const { widthDrawals, getAllWithdrawals, widthDrawalsLoading, userDetails } =
    useGlobalContext();
  const { country } = userDetails;
  const adminToken = JSON.parse(sessionStorage.getItem("adminToken"));

  const symbol = country?.symbol;

  useEffect(() => {
    getAllWithdrawals(adminToken);
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
              <h3>Type</h3>
            </div>
            <div className="amount">
              <h3>Amount</h3>
            </div>
            <div className="status">
              <h3>Status</h3>
            </div>
            <div className="reference">
              <h3>Update Date</h3>
            </div>
          </div>
          {widthDrawalsLoading ? (
            <div className="list_loader">
              <ColorRing
                visible={true}
                height="60"
                width="60"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
                colors={["black", "black", "black", "black", "black"]}
              />
            </div>
          ) : (
            widthDrawals.map((item, index) => {
              const { createdAt, transferType, status, amount, updatedAt } =
                item;

              let date = moment(createdAt).format("MMMM Do YYYY, h:mm:ss a");
              return (
                <div key={index} className="transaction_table_body">
                  <div className="date">
                    <p>{date}</p>
                  </div>
                  <div className="type">
                    <p>{transferType}</p>
                  </div>
                  <div className="amount">
                    <p>
                      {symbol}
                      {amount}
                    </p>
                  </div>
                  <div className="status">
                    <Button
                      title={
                        status === "approved"
                          ? "Approved"
                          : status === "failed"
                          ? "Failed"
                          : "Pending"
                      }
                      width={100}
                      height={30}
                      background={
                        status === "failed"
                          ? "#FFF3E7"
                          : status === "approve"
                          ? "#EDFFF9"
                          : "#FFF3E7"
                      }
                      color={
                        status === "failed" || status === "pending"
                          ? "#999DA1"
                          : "27AE61"
                      }
                    />
                  </div>
                  <div className="reference">
                    <p>{moment(updatedAt).format("MMMM Do YYYY, h:mm:ss a")}</p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
};

export default Deposits;
