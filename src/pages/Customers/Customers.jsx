import React, { useEffect } from "react";
import "./Customers.css";
import { Button, DashHead, TableBody } from "../../components";
import { FiSearch } from "react-icons/fi";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { useGlobalContext } from "../../context/context";

const Customers = ({ toggleNotification }) => {
  const { getAllUsers, allUsers, usersLoading } = useGlobalContext();
  const adminToken = JSON.parse(sessionStorage.getItem("adminToken"));

  useEffect(() => {
    getAllUsers(adminToken);
  }, []);

  return (
    <section className="customers">
      <DashHead
        title={"Clients"}
        paragraph={"View all clients on Here"}
        btn={false}
      />
      <div className="food_item_search">
        <div className="food_item_search_con">
          <p className="food_item_paragraphs">Search by: </p>
          <input
            className="food_item_inputs"
            type="text"
            placeholder="Customer name"
          />
          <Button
            icon={<FiSearch />}
            background={"var(--secondary-color)"}
            color={"#fff"}
            height={34}
            width={34}
            navigate={() => ""}
          />
        </div>
        <div>
          <p className="food_item_paragraphs">Status</p>
          <input className="food_item_inputs" type="text" />
        </div>
      </div>
      <div className="food_item_table">
        <div className="food_item_table_header">
          <h4>All Users</h4>
          <div>
            <p className="paginators_numbers">1-10</p>
            <p className="paginators_length">of 20</p>
            <Button
              fontsize={20}
              color={"var(--color5)"}
              height={35}
              width={35}
              background={"#fff"}
              icon={<RxCaretLeft />}
              border={"1px solid var(--color2)"}
            />
            <Button
              fontsize={20}
              color={"#fff"}
              height={35}
              width={35}
              background={"var(--secondary-color)"}
              icon={<RxCaretRight />}
            />
          </div>
        </div>
        <TableBody
          toggleNotification={toggleNotification}
          path={"user-details"}
          order={"Customers"}
          tableData={allUsers}
          loading={usersLoading}
        />
      </div>
    </section>
  );
};

export default Customers;
