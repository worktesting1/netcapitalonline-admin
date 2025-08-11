import React, { useEffect } from "react";
import "./Order.css";
import { DashHead, TableBody } from "../../components";
import { useGlobalContext } from "../../context/context";
import { ColorRing } from "react-loader-spinner";

const Order = () => {
  const adminToken = JSON.parse(sessionStorage.getItem("adminToken"));
  const {
    getAllDeposits,
    allDeposits,
    allUsers,
    getAllUsers,
    dLoading,
    usersLoading,
    widthDrawals,
    getAllWithdrawals,
    allLoans,
    getAllLoans,
  } = useGlobalContext();

  useEffect(() => {
    getAllDeposits(adminToken);
    getAllUsers(adminToken);
    getAllWithdrawals(adminToken);
    getAllLoans(adminToken);
  }, []);

  const successfulDeposits = allDeposits.filter(
    (item) => item.status === "approved"
  );
  const pendingDeposits = allDeposits.filter(
    (item) => item.status === "pending"
  );
  const failedDeposits = allDeposits.filter((item) => item.status === "failed");
  const successWithdrawals = widthDrawals.filter(
    (item) => item.status === "failed"
  );
  const pendingWithdrawals = widthDrawals.filter(
    (item) => item.status === "pending"
  );
  const failedWithdrawals = widthDrawals.filter(
    (item) => item.status === "failed"
  );

  return (
    <section className="orders">
      <DashHead title={"Dashboard"} paragraph={"View All Details here"} />
      <div className="order_statistics">
        <div className="order_statistics_item">
          <p className="dashboard_paragraph">Pending Deposits</p>
          <h3 className="dashboard_header_text">
            {dLoading ? (
              <ColorRing
                visible={true}
                height="35"
                width="35"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
                colors={["black", "black", "black", "black", "black"]}
              />
            ) : (
              pendingDeposits.length
            )}
          </h3>
        </div>
        <div className="order_statistics_item">
          <p className="dashboard_paragraph">Failed Deposits</p>
          <h3 className="dashboard_header_text">
            {dLoading ? (
              <ColorRing
                visible={true}
                height="35"
                width="35"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
                colors={["black", "black", "black", "black", "black"]}
              />
            ) : (
              failedDeposits.length
            )}
          </h3>
        </div>
        <div className="order_statistics_item">
          <p className="dashboard_paragraph">Successful Deposits</p>
          <h3 className="dashboard_header_text">
            {dLoading ? (
              <ColorRing
                visible={true}
                height="35"
                width="35"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
                colors={["black", "black", "black", "black", "black"]}
              />
            ) : (
              successfulDeposits.length
            )}
          </h3>
        </div>
      </div>
      <div className="order_statistics">
        <div className="order_statistics_item">
          <p className="dashboard_paragraph">Users</p>
          <h3 className="dashboard_header_text">
            {dLoading ? (
              <ColorRing
                visible={true}
                height="35"
                width="35"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
                colors={["black", "black", "black", "black", "black"]}
              />
            ) : (
              allUsers.length
            )}
          </h3>
        </div>
        <div className="order_statistics_item">
          <p className="dashboard_paragraph"> Deposits</p>
          <h3 className="dashboard_header_text">
            {dLoading ? (
              <ColorRing
                visible={true}
                height="35"
                width="35"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
                colors={["black", "black", "black", "black", "black"]}
              />
            ) : (
              allDeposits.length
            )}
          </h3>
        </div>
        <div className="order_statistics_item">
          <p className="dashboard_paragraph"> Withdrawals</p>
          <h3 className="dashboard_header_text">
            {dLoading ? (
              <ColorRing
                visible={true}
                height="35"
                width="35"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
                colors={["black", "black", "black", "black", "black"]}
              />
            ) : (
              widthDrawals.length
            )}
          </h3>
        </div>
        <div className="order_statistics_item">
          <p className="dashboard_paragraph"> Loans</p>
          <h3 className="dashboard_header_text">
            {dLoading ? (
              <ColorRing
                visible={true}
                height="35"
                width="35"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
                colors={["black", "black", "black", "black", "black"]}
              />
            ) : (
              allLoans.length
            )}
          </h3>
        </div>
      </div>
      <div className="order_statistics">
        <div className="order_statistics_item">
          <p className="dashboard_paragraph">All Pending Withdrawals</p>
          <h3 className="dashboard_header_text">
            {dLoading ? (
              <ColorRing
                visible={true}
                height="35"
                width="35"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
                colors={["black", "black", "black", "black", "black"]}
              />
            ) : (
              pendingWithdrawals.length
            )}
          </h3>
        </div>
        <div className="order_statistics_item">
          <p className="dashboard_paragraph">All Failed Withdrawals</p>
          <h3 className="dashboard_header_text">
            {dLoading ? (
              <ColorRing
                visible={true}
                height="35"
                width="35"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
                colors={["black", "black", "black", "black", "black"]}
              />
            ) : (
              failedWithdrawals.length
            )}
          </h3>
        </div>
        <div className="order_statistics_item">
          <p className="dashboard_paragraph"> Successful Withdrawals</p>
          <h3 className="dashboard_header_text">
            {dLoading ? (
              <ColorRing
                visible={true}
                height="35"
                width="35"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
                colors={["black", "black", "black", "black", "black"]}
              />
            ) : (
              successWithdrawals.length
            )}
          </h3>
        </div>
      </div>
      <div className="food_item_table">
        <div className="food_item_table_header">
          <h4>All Users</h4>
        </div>
        <TableBody
          symbol={""}
          path={"user-details"}
          order={"Order"}
          tableData={allUsers.slice(0, 2)}
          loading={usersLoading}
        />
      </div>
    </section>
  );
};

export default Order;
