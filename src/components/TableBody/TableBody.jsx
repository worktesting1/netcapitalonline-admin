import { useState } from "react";
import "./TableBody.css";
import Button from "../Button/Button";
import Delete from "../../asset/delete.svg";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment/moment";
import { ColorRing } from "react-loader-spinner";
import { useGlobalContext } from "../../context/context";
import { toast } from "react-toastify";
import axios from "axios";

const TableBody = ({
  path,
  order,
  toggleNotification,
  tableData,
  toggleDepositStatus,
  loading,
  toggleWithdrawalStatus,
}) => {
  const { userDetails, getAllLoans, baseUrl, getAllCards, getUserDetails } =
    useGlobalContext();

  const { country } = userDetails;
  const [status, setStatus] = useState(true);
  const [loader, setLoader] = useState(false);
  const [toggleCard, settoggleCard] = useState(false);

  const symbol = "$";
  const navigate = useNavigate();
  const adminToken = JSON.parse(sessionStorage.getItem("adminToken"));

  const handleApprovedLoan = (id, status, email) => {
    if (status !== "true") {
      setLoader(true);
      axios
        .put(
          `${baseUrl}loan/${id}`,
          {
            status: "true",
            email: email,
          },
          { headers: { token: adminToken } }
        )
        .then((data) => {
          if (data.status === 200) {
            setLoader(false);
            getAllLoans(adminToken);
            toast.success("Loan Approved");
          }
        })
        .catch((error) => {
          setLoader(false);
        });
    }
  };

  const toggleCardList = () => settoggleCard(!toggleCard);

  const toggleCardStatus = (cardId, status, userId) => {
    axios
      .put(
        `${baseUrl}card/${cardId}`,
        { status },
        { headers: { token: adminToken } }
      )
      .then((response) => {
        toggleCardList();
        getAllCards(adminToken);
        getUserDetails(userId);
        if (response.data.status === "approved") {
          toast.success("Card Approved");
        } else {
          toast.success("Card Cancelled");
        }
      })
      .catch((error) => {
        toggleCardList();
      });
  };

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
                        {country?.symbol ? country?.symbol : symbol}
                        {profit}
                      </p>
                    </div>
                    <div className={`table_body_header_item_2`}>
                      <p className="food_item_paragraphs">
                        {country?.symbol ? country?.symbol : symbol}
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
                        {country?.symbol ? country?.symbol : symbol}
                        {0}
                      </p>
                    </div>
                    <div className={`table_body_header_item_7`}>
                      <p className="food_item_paragraphs">
                        {country?.symbol ? country?.symbol : symbol}
                        {deposits}
                      </p>
                    </div>
                    <div className={`table_body_header_item_8`}>
                      <p className="food_item_paragraphs">
                        {country?.symbol ? country?.symbol : symbol}
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
                      <p className="food_item_paragraphs">
                        {country?.name ? country?.name : country}
                      </p>
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
                    transactionType,
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
                        <p className="paginators_numbers">{transactionType}</p>
                      </div>
                      <div className={`table_body_header_item_3`}>
                        <p className="food_item_paragraphs">
                          {country?.symbol ? country?.symbol : symbol}
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
                          background={
                            status === "approved" ? "#EDFFF9" : "#FFF3E7"
                          }
                          title={
                            status === "approved"
                              ? "Approved"
                              : status === "pending"
                              ? "Pending"
                              : "failed"
                          }
                          color={
                            status === "approved"
                              ? "var(--secondary-color)"
                              : "var(--color1)"
                          }
                          width={83}
                          height={30}
                          navigate={() => toggleDepositStatus(_id, userId, "")}
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
                "Identification Number",
                "id front",
                "id back",
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
            {tableData !== undefined && (
              <div className="table_body_body">
                <div className={`table_body_header_item_1`}>
                  <p className="food_item_paragraphs">{tableData?.__v + 1}</p>
                </div>
                <div className={`table_body_header_item_2`}>
                  <p className="paginators_numbers">{tableData?.idName}</p>
                </div>
                <div className={`table_body_header_item_3`}>
                  <p className="food_item_paragraphs">{tableData?.name}</p>
                </div>
                <div className={`table_body_header_item_4`}>
                  <p className="food_item_paragraphs">
                    {moment(tableData?.createdAt).format("MMMM Do YYYY, h:mm")}
                  </p>
                </div>
                <div className={`table_body_header_item_5`}>
                  <p className="food_item_paragraphs">{tableData?.idNumber}</p>
                </div>
                <div className={`table_body_header_item_6`}>
                  {tableData?.front?.[0]?.url ? (
                    <img src={tableData.front[0].url} className="proof" alt="" />
                  ) : (
                    <p className="food_item_paragraphs">No image</p>
                  )}
                </div>
                <div className={`table_body_header_item_7`}>
                  {tableData?.back?.[0]?.url ? (
                    <img src={tableData.back[0].url} className="proof" alt="" />
                  ) : (
                    <p className="food_item_paragraphs">No image</p>
                  )}
                </div>
                <div className={`table_body_header_item_8`}>
                  <Button
                    background={
                      tableData?.status === "approved"
                        ? "#EDFFF9"
                        : tableData?.status === "rejected"
                        ? "#FFF3E7"
                        : "#FFF9E7"
                    }
                    title={
                      tableData?.status === "approved"
                        ? "Approved"
                        : tableData?.status === "rejected"
                        ? "Rejected"
                        : "Pending"
                    }
                    color={
                      tableData?.status === "approved"
                        ? "var(--secondary-color)"
                        : tableData?.status === "rejected"
                        ? "var(--other-color)"
                        : "#b45309"
                    }
                    width={83}
                    height={30}
                    navigate={() =>
                      toggleDepositStatus(tableData?._id, "", "kyc")
                    }
                  />
                </div>
              </div>
            )}
          </section>
        </div>
      ) : order === "loans" ? (
        <section className="table_body">
          <div className="loan_table_body_header table_body_header">
            {[
              "S/n",
              "Loan Type",
              "Created At",
              "Reference Number",
              "Term",
              "Amount",
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
              tableData &&
              tableData.map((item, index) => {
                const {
                  _id,
                  amount,
                  createdAt,
                  referenceNumber,
                  status,
                  email,
                  loanType,
                  term,
                } = item;
                return (
                  <div
                    key={index}
                    className="loan_table_body_body table_body_body"
                  >
                    <div className={`table_body_header_item_1`}>
                      <p className="food_item_paragraphs">{index + 1}</p>
                    </div>
                    <div className={`table_body_header_item_2`}>
                      <p className="food_item_paragraphs">{loanType}</p>
                    </div>
                    <div className={`table_body_header_item_3`}>
                      <p className="food_item_paragraphs">
                        {moment(createdAt).format("MMMM Do YYYY, h:mm")}
                      </p>
                    </div>
                    <div className={`table_body_header_item_4`}>
                      <p className="food_item_paragraphs">{referenceNumber}</p>
                    </div>
                    <div className={`table_body_header_item_5`}>
                      <p className="food_item_paragraphs">${amount}</p>
                    </div>
                    <div className={`table_body_header_item_6`}>
                      <p className="food_item_paragraphs">{term}</p>
                    </div>

                    <div className={`table_body_header_item_7`}>
                      <button
                        className="update_wallet_btn btn"
                        onClick={() => handleApprovedLoan(_id, status, email)}
                      >
                        {loader
                          ? "Loading..."
                          : status === "pending"
                          ? "Pending"
                          : "Approved"}
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </>
        </section>
      ) : order === "customers_card_details" ? (
        <section className="table_body">
          <div className="table_body_header">
            {["S/n", "CCV", "Created At", "Card Number", "Name", "status"].map(
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
              tableData?.map((item, index) => {
                const {
                  name,
                  ccv,
                  cardNumber,
                  _id,
                  status,
                  createdAt,
                  userId,
                } = item;
                console.log(item);
                return (
                  <div key={index} className="table_body_body">
                    <div className={`table_body_header_item_1`}>
                      <p className="food_item_paragraphs">{index + 1}</p>
                    </div>
                    <div className={`table_body_header_item_2`}>
                      <p className="paginators_numbers">{ccv}</p>
                    </div>
                    <div className={`table_body_header_item_3`}>
                      {moment(createdAt).format("MMMM Do YYYY, h:mm")}
                    </div>
                    <div className={`table_body_header_item_4`}>
                      <p className="food_item_paragraphs">{cardNumber}</p>
                    </div>
                    <div className={`table_body_header_item_5`}>{name}</div>

                    <div className={`table_body_header_item_6`}>
                      <Button
                        navigate={toggleCardList}
                        background={
                          status === "pending" || status === "failed"
                            ? "#FFF3E7"
                            : "#EDFFF9"
                        }
                        title={
                          status === "approved"
                            ? "Approved"
                            : status === "pending"
                            ? "Pending"
                            : "Failed"
                        }
                        color={
                          status === "approved"
                            ? "#27AE61"
                            : "var(--other-color)"
                        }
                        width={83}
                        height={30}
                      />

                      <ul className={`${toggleCard ? "" : "toggle_list"}`}>
                        <li
                          onClick={() =>
                            toggleCardStatus(_id, "failed", userId)
                          }
                        >
                          failed
                        </li>
                        <li
                          onClick={() =>
                            toggleCardStatus(_id, "approved", userId)
                          }
                        >
                          approved
                        </li>
                      </ul>
                    </div>
                  </div>
                );
              })
            )}
          </>
        </section>
      ) : (
        <section className="table_body">
          <div className="table_body_header">
            {[
              "S/n",
              "BankName",
              "Transaction Type",
              "createdAt",
              "AccountNumber",
              "AccountName",
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
              tableData &&
              tableData.map((item, index) => {
                const {
                  bankName,
                  transferType,
                  createdAt,
                  accountName,
                  accountNumber,
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
                      <p className="paginators_numbers">{transferType}</p>
                    </div>
                    <div className={`table_body_header_item_3`}>
                      <p className="food_item_paragraphs">{bankName}</p>
                    </div>
                    <div className={`table_body_header_item_4`}>
                      <p className="food_item_paragraphs">{accountNumber}</p>
                    </div>
                    <div className={`table_body_header_item_5`}>
                      <p className="food_item_paragraphs">{accountName}</p>
                    </div>

                    <div className={`table_body_header_item_6`}>
                      <p className="food_item_paragraphs">
                        {moment(createdAt).format("MMMM Do YYYY, h:mm")}
                      </p>
                    </div>
                    <div className={`table_body_header_item_7`}>
                      <div>
                        <button
                          onClick={() => toggleWithdrawalStatus(_id, userId)}
                          className="update_wallet_btn btn"
                        >
                          {status}
                        </button>
                      </div>
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
