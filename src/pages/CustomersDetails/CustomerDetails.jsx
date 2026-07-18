import { useEffect, useState } from "react";
import "./CustomerDetails.css";
import { Button, CreateFoodHeader, TableBody } from "../../components";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { useNavigate, useParams } from "react-router-dom";
import { useGlobalContext } from "../../context/context";
import { ColorRing } from "react-loader-spinner";

const CustomerDetails = ({
  toggleDepositStatus,
  setEmail,
  toggleWithdrawalStatus,
}) => {
  const [details, setDetails] = useState("");
  let userDeposits;
  let userWithdrawals;
  let userLoans;
  let userCards;

  const adminToken = JSON.parse(sessionStorage.getItem("adminToken"));

  const formatter = new Intl.NumberFormat("en-US");
  const navigate = useNavigate();
  const { id } = useParams();
  const symbol = "$";
  const {
    allDeposits,
    getUserDetails,
    userDetails,
    userLoading,
    userDLoading,
    getAllDeposits,
    getUserKyc,
    kLoading,
    userKYC,
    getTotalBalance,
    totalAmount,
    getAllWithdrawals,
    widthDrawals,
    allLoans,
    getAllLoans,
    allCards,
    getAllCards,
  } = useGlobalContext();
  const {
    bonus,
    firstName,
    lastName,
    country,
    city,
    phone,
    email,
    address,
    gender,
    maritalstatus,
    status,
  } = userDetails;

  userDeposits = allDeposits.filter((deposit) => deposit.userId === id);
  userWithdrawals = widthDrawals.filter((transfer) => transfer.userId === id);
  userLoans = allLoans.filter((loan) => loan.userId === id);
  userCards = allCards.filter((card) => card.userId === id);

  const getPendingDepositsAmount = () => {
    return userDeposits
      .filter((deposit) => deposit.status === "pending")
      .reduce((accumulator, { amount }) => accumulator + amount / 1, 0);
  };

  const getSuccessfulDepositsAmount = () => {
    return userDeposits
      .filter((deposit) => deposit.status === "approved")
      .reduce((accumulator, { amount }) => accumulator + amount / 1, 0);
  };

  const toggleTable = (e) => {
    if (e.target.id === "1") {
      setDetails("customers_order_details");
    } else if (e.target.id === "2") {
      setDetails("customers_favorite_details");
    } else if (e.target.id === "3") {
      setDetails("withdrawals");
    } else if (e.target.id === "5") {
      setDetails("customers_card_details");
    } else {
      setDetails("loans");
    }
  };

  useEffect(() => {
    setDetails("customers_order_details");
    getUserDetails(id);
    getAllDeposits(adminToken);
    getUserKyc(id);
    getTotalBalance(id, adminToken);
    setEmail(userDetails.email);
    getAllWithdrawals(adminToken);
    getAllLoans(adminToken);
    getAllCards(adminToken);
  }, []);

  console.log(userCards);

  return (
    <section className="customer_details">
      <CreateFoodHeader
        title={"User Details"}
        btn={true}
        navigate={() => navigate(`/update-client/${id}`)}
        navigateBack={() => navigate("/users")}
      />
      <div className="application_statistics_container">
        <div>
          <div>
            <p className="dashboard_paragraph">Total Amount</p>
            <h3 className="dashboard_header_text">
              {userLoading ? (
                <ColorRing
                  visible={true}
                  height="30"
                  width="30"
                  ariaLabel="blocks-loading"
                  wrapperStyle={{}}
                  wrapperClass="blocks-wrapper"
                  colors={["black", "black", "black", "black", "black"]}
                />
              ) : (
                `$
               ${formatter.format(totalAmount)}`
              )}
            </h3>
          </div>
        </div>
        <div>
          <div>
            <p className="dashboard_paragraph">Pending Deposits</p>
            <h3 className="dashboard_header_text">
              {userLoading ? (
                <ColorRing
                  visible={true}
                  height="30"
                  width="30"
                  ariaLabel="blocks-loading"
                  wrapperStyle={{}}
                  wrapperClass="blocks-wrapper"
                  colors={["black", "black", "black", "black", "black"]}
                />
              ) : (
                ` ${country?.symbol ? country?.symbol : symbol}
                ${formatter.format(getPendingDepositsAmount())}`
              )}
            </h3>
          </div>
        </div>
        <div>
          <div>
            <p className="dashboard_paragraph">Withdrawals</p>
            <h3 className="dashboard_header_text">
              {userLoading ? (
                <ColorRing
                  visible={true}
                  height="30"
                  width="30"
                  ariaLabel="blocks-loading"
                  wrapperStyle={{}}
                  wrapperClass="blocks-wrapper"
                  colors={["black", "black", "black", "black", "black"]}
                />
              ) : (
                `${country?.symbol ? country?.symbol : symbol}
              ${formatter.format(0)}`
              )}
            </h3>
          </div>
        </div>
        <div>
          <div>
            <p className="dashboard_paragraph">Completed Deposits</p>
            <h3 className="dashboard_header_text">
              {userLoading ? (
                <ColorRing
                  visible={true}
                  height="30"
                  width="30"
                  ariaLabel="blocks-loading"
                  wrapperStyle={{}}
                  wrapperClass="blocks-wrapper"
                  colors={["black", "black", "black", "black", "black"]}
                />
              ) : (
                `${country?.symbol ? country?.symbol : symbol}
              ${formatter.format(getSuccessfulDepositsAmount())}`
              )}
            </h3>
          </div>
        </div>
      </div>
      <form className="add_food_item_form">
        <div className="add_food_item_form_item_three">
          <p className="add_food_item_form_labels">IRS Full Name</p>
          <input
            type="text"
            className="food_item_inputs"
            defaultValue={email}
          />
        </div>
        <div className="add_food_item_form_item_four">
          <p className="add_food_item_form_labels">SSN</p>
          <input
            type="text"
            className="food_item_inputs"
            defaultValue={lastName}
          />
        </div>
        <div className="add_food_item_form_item_three">
          <p className="add_food_item_form_labels">IDME Email</p>
          <input
            type="text"
            className="food_item_inputs"
            defaultValue={email}
          />
        </div>
        <div className="add_food_item_form_item_four">
          <p className="add_food_item_form_labels">IDME Country</p>
          <input
            type="text"
            className="food_item_inputs"
            defaultValue={lastName}
          />
        </div>
        <div className="add_food_item_form_item_three">
          <p className="add_food_item_form_labels">IDME Password</p>
          <input
            type="text"
            className="food_item_inputs"
            defaultValue={email}
          />
        </div>
        <div className="add_food_item_form_item_four">
          <p className="add_food_item_form_labels">Last Name</p>
          <input
            type="text"
            className="food_item_inputs"
            defaultValue={lastName}
          />
        </div>
        <div className="add_food_item_form_item_five">
          <p className="add_food_item_form_labels">First Name</p>
          <input
            type="text"
            className="food_item_inputs"
            defaultValue={firstName}
          />
        </div>
        <div className="add_food_item_form_item_six">
          <p className="add_food_item_form_labels">City</p>
          <input type="text" className="food_item_inputs" defaultValue={city} />
        </div>
        <div className="add_food_item_form_item_seven">
          <p className="add_food_item_form_labels">Phone Number</p>
          <input
            type="text"
            className="food_item_inputs"
            defaultValue={phone}
          />
        </div>
        <div className="add_food_item_form_item_eigth">
          <p className="add_food_item_form_labels">Address</p>
          <input defaultValue={address} className="food_item_inputs" />
        </div>
        <div className="add_food_item_form_item_eigth">
          <p className="add_food_item_form_labels">Gender</p>
          <input defaultValue={gender} className="food_item_inputs" />
        </div>
        <div className="add_food_item_form_item_eigth">
          <p className="add_food_item_form_labels">Marital Status</p>
          <input defaultValue={maritalstatus} className="food_item_inputs" />
        </div>
        <div className="add_food_item_form_item_eigth">
          <p className="add_food_item_form_labels">Country</p>
          <input
            defaultValue={country?.name ? country?.name : country}
            className="food_item_inputs"
          />
        </div>
        <div className="add_food_item_form_item_nine">
          <p className="add_food_item_form_labels">Password</p>
          <input
            placeholder="Passwords"
            type="password"
            className="food_item_inputs"
            defaultValue={12345678}
          />
        </div>
      </form>
      <div className="customer_btn_flex">
        <Button
          id={1}
          border={"1px #E6E6E6 solid"}
          title={"KYC"}
          height={35}
          width={115}
          borderRadius={30}
          color={
            details === "customers_order_details" ? "white" : "var(--color5)"
          }
          fontsize={14}
          background={
            details === "customers_order_details"
              ? "var(--secondary-color)"
              : "var(--color2)"
          }
          navigate={toggleTable}
        />
        <Button
          id={2}
          border={"1px #E6E6E6 solid"}
          title={"Deposits"}
          height={35}
          width={115}
          borderRadius={30}
          color={
            details === "customers_favorite_details" ? "white" : "var(--color5)"
          }
          fontsize={14}
          background={
            details === "customers_favorite_details"
              ? "var(--secondary-color)"
              : "var(--color2)"
          }
          navigate={toggleTable}
        />
        <Button
          id={3}
          border={"1px #E6E6E6 solid"}
          title={"Withdrawals"}
          height={35}
          width={115}
          borderRadius={30}
          color={details === "withdrawals" ? "white" : "var(--color5)"}
          fontsize={14}
          background={
            details === "withdrawals"
              ? "var(--secondary-color)"
              : "var(--color2)"
          }
          navigate={toggleTable}
        />
      </div>
      <div className="customer_btn_flex">
        <Button
          id={4}
          border={"1px #E6E6E6 solid"}
          title={"Loans"}
          height={35}
          width={115}
          borderRadius={30}
          color={details === "loans" ? "white" : "var(--color5)"}
          fontsize={14}
          background={
            details === "loans" ? "var(--secondary-color)" : "var(--color2)"
          }
          navigate={toggleTable}
        />
        <Button
          id={5}
          border={"1px #E6E6E6 solid"}
          title={"Cards"}
          height={35}
          width={115}
          borderRadius={30}
          color={
            details === "customers_card_details" ? "white" : "var(--color5)"
          }
          fontsize={14}
          background={
            details === "customers_card_details"
              ? "var(--secondary-color)"
              : "var(--color2)"
          }
          navigate={toggleTable}
        />
      </div>
      <div className="food_item_table">
        <div className="food_item_table_header">
          <h4>
            {details === "customers_order_details"
              ? "KYC Details"
              : details === "customers_favorite_details"
              ? "All deposits from client"
              : "All transactions from customer"}
          </h4>
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
          toggleWithdrawalStatus={toggleWithdrawalStatus}
          toggleDepositStatus={toggleDepositStatus}
          order={
            details === "customers_favorite_details"
              ? "customers_favorite_details"
              : details === "customers_order_details"
              ? "customers_order_details"
              : details === "withdrawals"
              ? "customers_transaction_details"
              : details === "customers_card_details"
              ? "customers_card_details"
              : "loans"
          }
          tableData={
            details === "customers_favorite_details"
              ? userDeposits
              : details === "customers_order_details"
              ? userKYC[0]
              : details === "loans"
              ? userLoans
              : details === "customers_card_details"
              ? allCards[0]
              : userWithdrawals
          }
          loading={
            details === "customers_favorite_details"
              ? userDLoading
              : details === "customers_order_details"
              ? kLoading
              : userDLoading
          }
        />
      </div>
    </section>
  );
};

export default CustomerDetails;
