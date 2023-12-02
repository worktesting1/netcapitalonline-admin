import React, { useEffect } from "react";
import "./Order.css";
import { DashHead, TableBody } from "../../components";
import { useGlobalContext } from "../../context/context";
import { ColorRing } from "react-loader-spinner";

const Order = () => {
  const symbol = "R";
  const adminToken = JSON.parse(sessionStorage.getItem("adminToken"));
  const {
    getAllDeposits,
    allDeposits,
    allUsers,
    getAllUsers,
    dLoading,
    usersLoading,
  } = useGlobalContext();

  useEffect(() => {
    getAllDeposits(adminToken);
    getAllUsers(adminToken);
  }, []);

  const successfulDeposits = allDeposits.filter((item) => item.status === true);
  const failedDeposits = allDeposits.filter((item) => item.status === false);

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
      </div>
      <div className="food_item_table">
        <div className="food_item_table_header">
          <h4>All Users</h4>
        </div>
        <TableBody
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
