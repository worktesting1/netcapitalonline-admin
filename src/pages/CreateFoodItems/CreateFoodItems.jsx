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
  const { baseUrl, getUserDetails, userDetails } = useGlobalContext();
  const adminToken = JSON.parse(sessionStorage.getItem("adminToken"));
  const [wLoading, setWLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingBonus, setLoadingBonus] = useState(false);
  const [loadingOtp, setLoadingOtp] = useState(false);
  const [loadingOtpMessage, setLoadingOtpMessage] = useState(false);
  const [bonus, setbonus] = useState(false);
  const [profit, setprofit] = useState(false);
  const [otpMessage, setotpMessage] = useState(false);
  const [otp, setotp] = useState("");
  const [transferStep, setTransferStep] = useState("");
  const [loadingTransfer, setLoadingT] = useState(false);
  const notify = () => toast.success("User Details Updated");

  console.log(userDetails);

  const navigateBack = () => {
    navigate(`/user-details/${id}`);
  };

  const handleBonus = () => {
    setLoadingBonus(true);
    axios
      .put(
        `${baseUrl}users/updatedata/${id}`,
        { bonus: bonus },
        { headers: { token: adminToken } }
      )
      .then((data) => {
        setLoadingBonus(false);
        notify();
        setTimeout(() => {
          navigateBack();
        }, 2000);
      })
      .catch((error) => {
        setLoadingBonus(false);
      });
  };
  const handleTransferStep = () => {
    setLoadingT(true);
    axios
      .put(
        `${baseUrl}users/updatedata/${id}`,
        { transferStep: transferStep },
        { headers: { token: adminToken } }
      )
      .then((data) => {
        setLoadingT(false);
        notify();
        setTimeout(() => {
          navigateBack();
        }, 2000);
      })
      .catch((error) => {
        setLoadingT(false);
      });
  };
  const handleProfit = () => {
    setLoading(true);
    axios
      .put(
        `${baseUrl}users/updatedata/${id}`,
        { profit: profit },
        { headers: { token: adminToken } }
      )
      .then((data) => {
        setLoading(false);
        notify();
        setTimeout(() => {
          navigateBack();
        }, 2000);
      })
      .catch((error) => {
        setLoading(false);
      });
  };
  const handleOtp = () => {
    setLoadingOtp(true);
    axios
      .put(
        `${baseUrl}users/updatedata/${id}`,
        { userOtp: otp },
        { headers: { token: adminToken } }
      )
      .then((data) => {
        setLoadingOtp(false);
        notify();
        setTimeout(() => {
          navigateBack();
        }, 2000);
      })
      .catch((error) => {
        setLoadingOtp(false);
      });
  };
  const handleOtpMessage = () => {
    setLoadingOtpMessage(true);
    axios
      .put(
        `${baseUrl}users/updatedata/${id}`,
        { otpMessage: otpMessage },
        { headers: { token: adminToken } }
      )
      .then((data) => {
        setLoadingOtpMessage(false);
        notify();
        setTimeout(() => {
          navigateBack();
        }, 2000);
      })
      .catch((error) => {
        setLoadingOtpMessage(false);
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

  useEffect(() => {
    getUserDetails(id);
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
          <p className="add_food_item_form_labels">Profit</p>
          <input
            type="text"
            name="profit"
            className="food_item_inputs"
            placeholder="Profit"
            onChange={(e) => setprofit(e.target.value)}
            defaultValue={userDetails.profit}
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
          title={"Update Profit"}
          background={"var(--secondary-color)"}
          color={"#FFF"}
          width={"43%"}
          height={45}
          navigate={handleProfit}
        />
        <div className="add_food_item_form_item_four">
          <p className="add_food_item_form_labels">Bonus</p>
          <input
            type="text"
            name="bonus"
            className="food_item_inputs"
            placeholder="Bonus"
            onChange={(e) => setbonus(e.target.value)}
            defaultValue={userDetails.bonus}
          />
        </div>
        <Button
          icon={
            loadingBonus && (
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
          title={"Update Bonus"}
          background={"var(--secondary-color)"}
          color={"#FFF"}
          width={"43%"}
          height={45}
          navigate={handleBonus}
        />
        <div className="add_food_item_form_item_four">
          <p className="add_food_item_form_labels">OTP</p>
          <input
            type="text"
            className="food_item_inputs"
            placeholder="OTP"
            onChange={(e) => setotp(e.target.value)}
            defaultValue={userDetails.userOtp}
          />
        </div>
        <Button
          icon={
            loadingOtp && (
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
          title={"Update OTP"}
          background={"var(--secondary-color)"}
          color={"#FFF"}
          width={"43%"}
          height={45}
          navigate={handleOtp}
        />
        <div className="add_food_item_form_item_four">
          <p className="add_food_item_form_labels">OTP Message</p>
          <input
            type="text"
            className="food_item_inputs"
            placeholder="OTP Message"
            defaultValue={userDetails.otpMessage}
            onChange={(e) => setotpMessage(e.target.value)}
          />
        </div>
        <Button
          icon={
            loadingOtpMessage && (
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
          title={"Update Message"}
          background={"var(--secondary-color)"}
          color={"#FFF"}
          width={"43%"}
          height={45}
          navigate={handleOtpMessage}
        />
        <div className="add_food_item_form_item_four">
          <p className="add_food_item_form_labels">OTP Step</p>
          <input
            type="text"
            className="food_item_inputs"
            placeholder="OTP Step"
            onChange={(e) => setTransferStep(e.target.value)}
            defaultValue={userDetails.transferStep}
          />
        </div>
        <Button
          icon={
            loadingTransfer && (
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
          title={"Update Step"}
          background={"var(--secondary-color)"}
          color={"#FFF"}
          width={"43%"}
          height={45}
          navigate={handleTransferStep}
        />

        <Button
          color={"white"}
          title={wLoading ? "Loading..." : "Activate Withdrawal"}
          navigate={activateWithdrawal}
        />
      </div>
      <ToastContainer />
    </section>
  );
};

export default CreateFoodItems;
