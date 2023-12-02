import React, { useState } from "react";
import "./TableBody.css";
import Button from "../Button/Button";
import Delete from "../../asset/delete.svg";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment/moment";
import { ColorRing } from "react-loader-spinner";

const TableBody = ({
  path,
  order,
  toggleNotification,
  tableData,
  toggleDepositStatus,
  loading,
}) => {
  const [status, setStatus] = useState(true);
  const symbol = "R";
  const navigate = useNavigate();
  return (
    <>
      {order === "Order" ? (
        <section className="table_body">
          <div className="table_body_header">
            {[
              "Profit",
              "Bonus",
              "Customer",
              "created on",
              "Gender",
              "Pending Withdrawal",
              "Successful Deposit",
              "Pending Deposits",
            ].map((item, index) => (
              <div
                className={`table_body_header_item_${1 + index}`}
                key={index}
              >
                <p className="table_body_header_text">{item}</p>
              </div>
            ))}
          </div>
          <>
            {loading ? (
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
              tableData?.map((item, index) => {
                const {
                  profit,
                  firstName,
                  lastName,
                  bonus,
                  created_At,
                  gender,
                  deposits,
                  pendingDeposits,
                  pendingWithdrawals,
                  _id,
                } = item;
                return (
                  <Link
                    to={`/${path}/${_id}`}
                    key={index}
                    className="table_body_body"
                  >
                    <div className={`table_body_header_item_1`}>
                      <p className="food_item_paragraphs">
                        {symbol}
                        {profit}
                      </p>
                    </div>
                    <div className={`table_body_header_item_2`}>
                      <p className="food_item_paragraphs">
                        {symbol}
                        {bonus}
                      </p>
                    </div>
                    <div className={`table_body_header_item_3`}>
                      <p className="food_item_paragraphs">
                        {firstName} {lastName}
                      </p>
                    </div>
                    <div className={`table_body_header_item_4`}>
                      <p className="food_item_paragraphs">
                        {moment(item.createdAt).format("MMMM Do YYYY, h:mm")}
                      </p>
                    </div>
                    <div className={`table_body_header_item_5`}>
                      <p className="food_item_paragraphs">{gender}</p>
                    </div>
                    <div className={`table_body_header_item_6`}>
                      <p className="food_item_paragraphs">
                        {symbol}
                        {0}
                      </p>
                    </div>
                    <div className={`table_body_header_item_7`}>
                      <p className="food_item_paragraphs">
                        {symbol}
                        {deposits}
                      </p>
                    </div>
                    <div className={`table_body_header_item_8`}>
                      <p className="food_item_paragraphs">
                        {symbol}
                        {pendingDeposits}
                      </p>
                    </div>
                  </Link>
                );
              })
            )}
          </>
        </section>
      ) : order === "Orderdetails" ? (
        <section className="table_body">
          <div className="table_body_header">
            {[
              "S/n",
              "item",
              "Description",
              "price",
              "quantity",
              "prepare time",
              "Total amount",
            ].map((item, index) => (
              <div
                className={`table_body_header_item_${1 + index}`}
                key={index}
              >
                <p className="table_body_header_text">{item}</p>
              </div>
            ))}
          </div>
          <>
            {[1].map((_, index) => (
              <Link
                to={`/${path}/${index + 1}`}
                key={index}
                className="table_body_body"
              >
                <div className={`table_body_header_item_1`}>
                  <p className="food_item_paragraphs">1</p>
                </div>
                <div className={`table_body_header_item_2`}>
                  <p className="food_item_paragraphs">Egusi soup with beef</p>
                </div>
                <div className={`table_body_header_item_3`}>
                  <p className="food_item_paragraphs">
                    Special rice and stew for family
                  </p>
                </div>
                <div className={`table_body_header_item_4`}>
                  <p className="food_item_paragraphs">2000</p>
                </div>
                <div className={`table_body_header_item_5`}>
                  <p className="food_item_paragraphs">10</p>
                </div>
                <div className={`table_body_header_item_6`}>
                  <p className="food_item_paragraphs">Soup</p>
                </div>
                <div className={`table_body_header_item_7`}>
                  <p className="food_item_paragraphs">8</p>
                </div>
              </Link>
            ))}
          </>
        </section>
      ) : order === "Customers" ? (
        <section className="table_body">
          <div className="table_body_header">
            {[
              "S/n",
              "id",
              "User",
              "created on",
              "Phone No",
              "email",
              "Country",
              "status",
              "action",
            ].map((item, index) => (
              <div
                key={index}
                className={`table_body_header_item_${1 + index}`}
              >
                <p className="table_body_header_text">{item}</p>
              </div>
            ))}
          </div>
          <>
            {loading ? (
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
              tableData?.map((item, index) => {
                const {
                  firstName,
                  lastName,
                  created_At,
                  phone,
                  _id,
                  email,
                  country,
                } = item;
                return (
                  <div key={index} className="table_body_body">
                    <div className={`table_body_header_item_1`}>
                      <p className="food_item_paragraphs">{index + 1}</p>
                    </div>
                    <Link
                      to={`/${path}/${_id}`}
                      className={`table_body_header_item_2`}
                    >
                      <p className="paginators_numbers">{_id.slice(0, 8)}</p>
                    </Link>
                    <div className={`table_body_header_item_3`}>
                      <p className="food_item_paragraphs">{`${firstName} ${lastName}`}</p>
                    </div>
                    <div className={`table_body_header_item_4`}>
                      <p className="food_item_paragraphs">
                        {moment(item.createdAt).format("MMMM Do YYYY, h:mm")}
                      </p>
                    </div>
                    <div className={`table_body_header_item_5`}>
                      <p className="food_item_paragraphs">{phone}</p>
                    </div>
                    <div className={`table_body_header_item_6`}>
                      <p className="food_item_paragraphs">{email}</p>
                    </div>
                    <div className={`table_body_header_item_7`}>
                      <p className="food_item_paragraphs">{country}</p>
                    </div>
                    <div className={`table_body_header_item_8`}>
                      <Button
                        background={status ? "#EDFFF9" : "#FFF3E7"}
                        title={status ? "Active" : "Inactive"}
                        color={status ? "#27AE61" : "var(--other-color)"}
                        width={83}
                        height={30}
                      />
                    </div>
                    <div className={`table_body_header_item_9`}>
                      <img
                        onClick={() => toggleNotification(_id)}
                        src={Delete}
                        alt=""
                      />
                    </div>
                  </div>
                );
              })
            )}
          </>
        </section>
      ) : order === "customers_favorite_details" ? (
        <div className="orders">
          <section className="table_body">
            <div className="table_body_header">
              {[
                "S/n",
                "type",
                "amount",
                "created on",
                "Proof",
                "Updated At",
                "Reference",
                "status",
              ].map((item, index) => (
                <div
                  key={index}
                  className={`table_body_header_item_${1 + index}`}
                >
                  <p className="table_body_header_text">{item}</p>
                </div>
              ))}
            </div>
            <>
              {loading ? (
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
                tableData.map((item, index) => {
                  const {
                    updatedAt,
                    createdAt,
                    amount,
                    transactiontype,
                    image,
                    status,
                    _id,
                    userId,
                  } = item;
                  return (
                    <div key={index} className="table_body_body">
                      <div className={`table_body_header_item_1`}>
                        <p className="food_item_paragraphs">{index + 1}</p>
                      </div>
                      <div className={`table_body_header_item_2`}>
                        <p className="paginators_numbers">{transactiontype}</p>
                      </div>
                      <div className={`table_body_header_item_3`}>
                        <p className="food_item_paragraphs">
                          {symbol}
                          {amount}
                        </p>
                      </div>
                      <div className={`table_body_header_item_4`}>
                        <p className="food_item_paragraphs">
                          {moment(createdAt).format("MMMM Do YYYY, h:mm")}
                        </p>
                      </div>
                      <div className={`table_body_header_item_5`}>
                        {!image ? (
                          <p className="food_item_paragraphs">Image Deleted</p>
                        ) : (
                          <img src={image[0]?.url} className="proof" alt="" />
                        )}
                      </div>
                      <div className={`table_body_header_item_6`}>
                        <p className="food_item_paragraphs">
                          {moment(updatedAt).format("MMMM Do YYYY, h:mm")}
                        </p>
                      </div>
                      <div className={`table_body_header_item_7`}>
                        <p className="food_item_paragraphs">{_id}</p>
                      </div>
                      <div className={`table_body_header_item_8`}>
                        <Button
                          background={status ? "#EDFFF9" : "#FFF3E7"}
                          title={status ? "Approved" : "Pending"}
                          color={
                            status ? "var(--secondary-color)" : "var(--color1)"
                          }
                          width={83}
                          height={30}
                          navigate={() => toggleDepositStatus(_id, userId)}
                        />
                      </div>
                    </div>
                  );
                })
              )}
            </>
          </section>
        </div>
      ) : order === "customers_order_details" ? (
        <div className="orders">
          <section className="table_body">
            <div className="table_body_header">
              {[
                "S/n",
                "id",
                "Client",
                "created on",
                "Wallet Address",
                "amount",
                "Reference",
                "status",
              ].map((item, index) => (
                <div
                  className={`table_body_header_item_${1 + index}`}
                  key={index}
                >
                  <p className="table_body_header_text">{item}</p>
                </div>
              ))}
            </div>
            <>
              {[1, 2].map((_, index) => (
                <Link
                  to={`/${path}/${index + 1}`}
                  key={index}
                  className="table_body_body"
                >
                  <div className={`table_body_header_item_1`}>
                    <p className="food_item_paragraphs">1</p>
                  </div>
                  <div className={`table_body_header_item_2`}>
                    <p className="paginators_numbers">345</p>
                  </div>
                  <div className={`table_body_header_item_3`}>
                    <p className="food_item_paragraphs">John Doe</p>
                  </div>
                  <div className={`table_body_header_item_4`}>
                    <p className="food_item_paragraphs">2023-06-18 02:33:54</p>
                  </div>
                  <div className={`table_body_header_item_5`}>
                    <p className="food_item_paragraphs">
                      3J8LFx8nCnqLZS7TfEU9ZjAmEXit5N7KUe
                    </p>
                  </div>
                  <div className={`table_body_header_item_6`}>
                    <p className="food_item_paragraphs">{symbol}3,800</p>
                  </div>
                  <div className={`table_body_header_item_7`}>
                    <p className="food_item_paragraphs">
                      3J8LFx8nCnqLZS7TfEU9ZjA
                    </p>
                  </div>
                  <div className={`table_body_header_item_8`}>
                    <Button
                      background={status ? "#EDFFF9" : "#FFF3E7"}
                      title={status ? "Active" : "Inactive"}
                      color={
                        status ? "var(--secondary-color)" : "var(--other-color)"
                      }
                      width={83}
                      height={30}
                    />
                  </div>
                </Link>
              ))}
            </>
          </section>
        </div>
      ) : (
        <section className="table_body">
          <div className="table_body_header">
            {["S/n", "Name", "Wallet Address", "updated at", "action"].map(
              (item, index) => (
                <div
                  key={index}
                  className={`table_body_header_item_${1 + index}`}
                >
                  <p className="table_body_header_text">{item}</p>
                </div>
              )
            )}
          </div>
          <>
            {loading ? (
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
              tableData &&
              tableData.map((item, index) => {
                const { walletName, address, _id, updatedAt } = item;
                return (
                  <div key={index} className="table_body_body">
                    <div className={`table_body_header_item_1`}>
                      <p className="food_item_paragraphs">{index + 1}</p>
                    </div>
                    <div className={`table_body_header_item_2`}>
                      <p className="paginators_numbers">{walletName}</p>
                    </div>
                    <div className={`table_body_header_item_3`}>
                      <p className="food_item_paragraphs">{address}</p>
                    </div>
                    <div className={`table_body_header_item_4`}>
                      <p className="food_item_paragraphs">
                        {moment(updatedAt).format("MMMM Do YYYY, h:mm")}
                      </p>
                    </div>
                    <div className={`table_body_header_item_5`}>
                      <Link to={`/${path}/${_id}`}>
                        <button className="update_wallet_btn btn">
                          Update Wallet
                        </button>
                      </Link>
                    </div>
                  </div>
                );
              })
            )}
          </>
        </section>
      )}
    </>
  );
};

export default TableBody;
