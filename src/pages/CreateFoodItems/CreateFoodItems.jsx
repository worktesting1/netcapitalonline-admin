import React, { useEffect, useState } from "react";
import "./CreateFoodItems.css";
import { Button, CreateFoodHeader } from "../../components";
import { useNavigate, useParams } from "react-router-dom";
import { useGlobalContext } from "../../context/context";
import axios from "axios";
import { ColorRing } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateFoodItems = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { baseUrl, getUserDetails, userDetails, getTotalBalance, totalAmount } =
    useGlobalContext();
  const adminToken = JSON.parse(sessionStorage.getItem("adminToken"));
  const [wLoading, setWLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profit, setprofit] = useState(false);
  const [forthCode, setForthCode] = useState("");
  const [forthMessage, setForthMessage] = useState("");
  const [firstCode, setfirstCode] = useState("");
  const [firstMessage, setfirstMessage] = useState("");
  const [secondMLoader, setSecondMLoader] = useState(false);
  const [secondLoader, setSecondLoader] = useState(false);
  const [thirdLoader, setthirdLoader] = useState(false);
  const [thirdMLoader, setthirdMLoader] = useState(false);
  const [forthLoader, setforthLoader] = useState(false);
  const [forthMLoader, setforthMLoader] = useState(false);
  const [secondCode, setsecondCode] = useState("");
  const [cardAmount, setCardAmount] = useState(0);
  const [cAmountLoading, setcAmountLoading] = useState(false);

  const [firstFormatLoader, setFirstFormatLoader] = useState(false);
  const [firstMessageFormatLoader, setFirstMessageFormatLoader] =
    useState(false);
  const [secondMessage, setsecondMessage] = useState("");
  const [thirdMessage, setthirdMessage] = useState("");
  const [thirdCode, setthirdCode] = useState("");
  const [cardLoader, setCardLoader] = useState(false);

  const notify = () => toast.success("User Details Updated");

  const navigateBack = () => {
    navigate(`/user-details/${id}`);
  };

  const handleCardAmount = () => {
    setcAmountLoading(true);
    axios
      .put(
        `${baseUrl}users/updatedata/${id}`,
        { cardAmount },
        { headers: { token: adminToken } }
      )
      .then((data) => {
        setcAmountLoading(false);
        toast.success("Card Amount Updated");
        setTimeout(() => {
          navigateBack();
        }, 2000);
      })
      .catch((error) => {
        setcAmountLoading(false);
      });
  };

  const handlefirstBilling = () => {
    setFirstFormatLoader(true);
    axios
      .put(
        `${baseUrl}users/updatedata/${id}`,
        { firstCode },
        { headers: { token: adminToken } }
      )
      .then((data) => {
        setFirstFormatLoader(false);
        notify();
        setTimeout(() => {
          navigateBack();
        }, 2000);
      })
      .catch((error) => {
        setFirstFormatLoader(false);
      });
  };
  const handleFirstBillingMessage = () => {
    setFirstMessageFormatLoader(true);
    axios
      .put(
        `${baseUrl}users/updatedata/${id}`,
        { firstMessage },
        { headers: { token: adminToken } }
      )
      .then((data) => {
        setFirstMessageFormatLoader(false);
        notify();
        setTimeout(() => {
          navigateBack();
        }, 2000);
      })
      .catch((error) => {
        setFirstMessageFormatLoader(false);
      });
  };
  const handleSecondBilling = () => {
    setSecondLoader(true);
    axios
      .put(
        `${baseUrl}users/updatedata/${id}`,
        { secondCode },
        { headers: { token: adminToken } }
      )
      .then((data) => {
        setSecondLoader(false);
        notify();
        setTimeout(() => {
          navigateBack();
        }, 2000);
      })
      .catch((error) => {
        setSecondLoader(false);
      });
  };
  const handleSecondBillingMessage = () => {
    setSecondMLoader(true);
    axios
      .put(
        `${baseUrl}users/updatedata/${id}`,
        { secondMessage },
        { headers: { token: adminToken } }
      )
      .then((data) => {
        setSecondMLoader(false);
        notify();
        setTimeout(() => {
          navigateBack();
        }, 2000);
      })
      .catch((error) => {
        setSecondMLoader(false);
      });
  };
  const handleThirdBilling = () => {
    setthirdLoader(true);
    axios
      .put(
        `${baseUrl}users/updatedata/${id}`,
        { thirdCode },
        { headers: { token: adminToken } }
      )
      .then((data) => {
        setthirdLoader(false);
        notify();
        setTimeout(() => {
          navigateBack();
        }, 2000);
      })
      .catch((error) => {
        setthirdLoader(false);
      });
  };
  const handleThirdBillingMessage = () => {
    setthirdMLoader(true);
    axios
      .put(
        `${baseUrl}users/updatedata/${id}`,
        { thirdMessage },
        { headers: { token: adminToken } }
      )
      .then((data) => {
        setthirdMLoader(false);
        notify();
        setTimeout(() => {
          navigateBack();
        }, 2000);
      })
      .catch((error) => {
        setthirdMLoader(false);
      });
  };
  const handleForthBilling = () => {
    setforthLoader(true);
    axios
      .put(
        `${baseUrl}users/updatedata/${id}`,
        { forthCode },
        { headers: { token: adminToken } }
      )
      .then((data) => {
        setforthLoader(false);
        notify();
        setTimeout(() => {
          navigateBack();
        }, 2000);
      })
      .catch((error) => {
        setforthLoader(false);
      });
  };
  const handleForthBillingMessage = () => {
    setforthMLoader(true);
    axios
      .put(
        `${baseUrl}users/updatedata/${id}`,
        { forthMessage },
        { headers: { token: adminToken } }
      )
      .then((data) => {
        setforthMLoader(false);
        notify();
        setTimeout(() => {
          navigateBack();
        }, 2000);
      })
      .catch((error) => {
        setforthMLoader(false);
      });
  };

  const handleProfit = () => {
    setLoading(true);
    axios
      .put(
        `${baseUrl}wallet/update-balance`,
        { amount: Number(profit), userId: id },
        { headers: { token: adminToken } }
      )
      .then((data) => {
        console.log(data);
        setLoading(false);
        toast.success("Profit Updated");
        setTimeout(() => {
          navigateBack();
        }, 2000);
      })
      .catch((error) => {
        console.log(error);

        setLoading(false);
      });
  };

  const activateWithdrawal = () => {
    setWLoading(true);
    axios
      .put(
        `${baseUrl}users/updatedata/${id}`,
        {
          status: true,
        },
        { headers: { token: adminToken } }
      )
      .then((data) => {
        if (data.status === 200) {
          console.log(data);
          toast.success("Withdrawal Active");
          setWLoading(false);
          setTimeout(() => {
            navigate("/users");
          }, 2000);
        }
      })
      .catch((error) => {
        console.log(error);
        setWLoading(false);
      });
  };

  const activateCardIssuing = () => {
    setCardLoader(true);
    axios
      .put(
        `${baseUrl}users/updatedata/${id}`,
        {
          cardIssuing: true,
        },
        { headers: { token: adminToken } }
      )
      .then((data) => {
        if (data.status === 200) {
          toast.success("User Can Apply for Card");
          setCardLoader(false);
          setTimeout(() => {
            navigateBack();
          }, 2000);
        }
      })
      .catch((error) => {
        setCardLoader(false);
      });
  };

  useEffect(() => {
    getUserDetails(id);
    getTotalBalance(id, adminToken);
  }, []);

  return (
    <section className="add_food_item_container">
      <CreateFoodHeader
        btn={false}
        navigateBack={navigateBack}
        title={"Update User Details"}
      />
      <div className="add_food_item_form">
        <div className="add_food_item_form_item_three">
          <p className="add_food_item_form_labels">Bank Total</p>
          <input
            type="text"
            name="profit"
            className="food_item_inputs"
            placeholder="Profit"
            onChange={(e) => setprofit(e.target.value)}
            defaultValue={totalAmount}
          />
        </div>
        <Button
          icon={
            loading && (
              <ColorRing
                visible={true}
                height="40"
                width="40"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
                colors={["#fff", "#fff", "#fff", "#fff", "#fff"]}
              />
            )
          }
          title={"Update Bank Total"}
          background={"var(--secondary-color)"}
          color={"#FFF"}
          width={"43%"}
          height={45}
          navigate={handleProfit}
        />

        <div className="add_food_item_form_item_four">
          <p className="add_food_item_form_labels">Second Code</p>
          <input
            type="text"
            className="food_item_inputs"
            placeholder="Update First Code"
            onChange={(e) => setsecondCode(e.target.value)}
            defaultValue={userDetails.secondCode}
          />
        </div>
        <Button
          icon={
            secondLoader && (
              <ColorRing
                visible={true}
                height="40"
                width="40"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
                colors={["#fff", "#fff", "#fff", "#fff", "#fff"]}
              />
            )
          }
          title={"Update Code"}
          background={"var(--secondary-color)"}
          color={"#FFF"}
          width={"43%"}
          height={45}
          navigate={handleSecondBilling}
        />
        <div className="add_food_item_form_item_four">
          <p className="add_food_item_form_labels">Second Billing Format</p>
          <input
            type="text"
            className="food_item_inputs"
            placeholder="Update First Code"
            onChange={(e) => setsecondMessage(e.target.value)}
            defaultValue={userDetails.secondMessage}
          />
        </div>
        <Button
          icon={
            secondMLoader && (
              <ColorRing
                visible={true}
                height="40"
                width="40"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
                colors={["#fff", "#fff", "#fff", "#fff", "#fff"]}
              />
            )
          }
          title={"Update Format"}
          background={"var(--secondary-color)"}
          color={"#FFF"}
          width={"43%"}
          height={45}
          navigate={handleSecondBillingMessage}
        />
        <div className="add_food_item_form_item_four">
          <p className="add_food_item_form_labels">Third Code</p>
          <input
            type="text"
            className="food_item_inputs"
            placeholder="Update First Code"
            onChange={(e) => setthirdCode(e.target.value)}
            defaultValue={userDetails.thirdCode}
          />
        </div>
        <Button
          icon={
            thirdLoader && (
              <ColorRing
                visible={true}
                height="40"
                width="40"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
                colors={["#fff", "#fff", "#fff", "#fff", "#fff"]}
              />
            )
          }
          title={"Update Code"}
          background={"var(--secondary-color)"}
          color={"#FFF"}
          width={"43%"}
          height={45}
          navigate={handleThirdBilling}
        />
        <div className="add_food_item_form_item_four">
          <p className="add_food_item_form_labels">Third Billing Format</p>
          <input
            type="text"
            className="food_item_inputs"
            placeholder="Update First Code"
            onChange={(e) => setthirdMessage(e.target.value)}
            defaultValue={userDetails.thirdMessage}
          />
        </div>
        <Button
          icon={
            thirdMLoader && (
              <ColorRing
                visible={true}
                height="40"
                width="40"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
                colors={["#fff", "#fff", "#fff", "#fff", "#fff"]}
              />
            )
          }
          title={"Update Format"}
          background={"var(--secondary-color)"}
          color={"#FFF"}
          width={"43%"}
          height={45}
          navigate={handleThirdBillingMessage}
        />
        <div className="add_food_item_form_item_four">
          <p className="add_food_item_form_labels">Forth Code</p>
          <input
            type="text"
            className="food_item_inputs"
            placeholder="Update First Code"
            onChange={(e) => setForthCode(e.target.value)}
            defaultValue={userDetails.forthCode}
          />
        </div>
        <Button
          icon={
            forthLoader && (
              <ColorRing
                visible={true}
                height="40"
                width="40"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
                colors={["#fff", "#fff", "#fff", "#fff", "#fff"]}
              />
            )
          }
          title={"Update Code"}
          background={"var(--secondary-color)"}
          color={"#FFF"}
          width={"43%"}
          height={45}
          navigate={handleForthBilling}
        />
        <div className="add_food_item_form_item_four">
          <p className="add_food_item_form_labels">Forth Billing Format</p>
          <input
            type="text"
            className="food_item_inputs"
            placeholder="Update First Code"
            onChange={(e) => setForthMessage(e.target.value)}
            defaultValue={userDetails.forthMessage}
          />
        </div>
        <Button
          icon={
            forthMLoader && (
              <ColorRing
                visible={true}
                height="40"
                width="40"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
                colors={["#fff", "#fff", "#fff", "#fff", "#fff"]}
              />
            )
          }
          title={"Update Format"}
          background={"var(--secondary-color)"}
          color={"#FFF"}
          width={"43%"}
          height={45}
          navigate={handleForthBillingMessage}
        />

        <div className="add_food_item_form_item_four">
          <p className="add_food_item_form_labels">First Code</p>
          <input
            type="text"
            className="food_item_inputs"
            placeholder="Withdrawal Step"
            onChange={(e) => setfirstCode(e.target.value)}
            defaultValue={userDetails.firstCode}
          />
        </div>
        <Button
          icon={
            firstFormatLoader && (
              <ColorRing
                visible={true}
                height="40"
                width="40"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
                colors={["#fff", "#fff", "#fff", "#fff", "#fff"]}
              />
            )
          }
          title={"Update First Code"}
          background={"var(--secondary-color)"}
          color={"#FFF"}
          width={"43%"}
          height={45}
          navigate={handlefirstBilling}
        />
        <div className="add_food_item_form_item_four">
          <p className="add_food_item_form_labels">First Billing Format</p>
          <input
            type="text"
            className="food_item_inputs"
            placeholder="Withdrawal Step"
            onChange={(e) => setfirstMessage(e.target.value)}
            defaultValue={userDetails.firstMessage}
          />
        </div>
        <Button
          icon={
            firstMessageFormatLoader && (
              <ColorRing
                visible={true}
                height="40"
                width="40"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
                colors={["#fff", "#fff", "#fff", "#fff", "#fff"]}
              />
            )
          }
          title={"Update Format"}
          background={"var(--secondary-color)"}
          color={"#FFF"}
          width={"43%"}
          height={45}
          navigate={handleFirstBillingMessage}
        />

        <div className="add_food_item_form_item_four">
          <p className="add_food_item_form_labels">Card Amount</p>
          <input
            type="text"
            className="food_item_inputs"
            placeholder="Update Card Amount"
            onChange={(e) => setCardAmount(e.target.value)}
            defaultValue={userDetails.cardAmount}
          />
        </div>
        <Button
          icon={
            cAmountLoading && (
              <ColorRing
                visible={true}
                height="40"
                width="40"
                ariaLabel="blocks-loading"
                wrapperStyle={{}}
                wrapperClass="blocks-wrapper"
                colors={["#fff", "#fff", "#fff", "#fff", "#fff"]}
              />
            )
          }
          title={"Update Card Amount"}
          background={"var(--secondary-color)"}
          color={"#FFF"}
          width={"43%"}
          height={45}
          navigate={handleCardAmount}
        />

        <Button
          color={"white"}
          title={cardLoader ? "Loading..." : "Activate Card Issuing"}
          navigate={activateCardIssuing}
        />
      </div>
      <ToastContainer />
    </section>
  );
};

export default CreateFoodItems;
