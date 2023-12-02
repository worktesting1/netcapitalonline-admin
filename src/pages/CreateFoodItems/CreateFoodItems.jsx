import React, { useEffect, useState } from "react";
import "./CreateFoodItems.css";
import { Button, CreateFoodHeader } from "../../components";
import { useNavigate, useParams } from "react-router-dom";
import { useGlobalContext } from "../../context/context";
import axios from "axios";
import { useForm } from "react-hook-form";
import { ColorRing } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateFoodItems = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { baseUrl, getUserDetails, userDetails } = useGlobalContext();
  const adminToken = JSON.parse(sessionStorage.getItem("adminToken"));
  const [wLoading, setWLoading] = useState(false);
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const [bonus, setbonus] = useState(false);
  const [profit, setprofit] = useState(false);
  const [otpMessage, setotpMessage] = useState(false);
  const [otpStep, setotpStep] = useState(false);
  const [otp, setotp] = useState(false);
  const notify = () => toast.success("User Details Updated");

  const navigateBack = () => {
    navigate(`/user-details/${id}`);
  };

  const handleBonus = () => {
    axios
      .put(
        `${baseUrl}users/updatedata/${id}`,
        { bonus: bonus },
        { headers: { token: adminToken } }
      )
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  };
  const handleProfit = () => {
    axios
      .put(
        `${baseUrl}users/updatedata/${id}`,
        { profit: profit },
        { headers: { token: adminToken } }
      )
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  };

  const activateWithdrawal = () => {
    setWLoading(true);
    axios
      .patch(
        `${baseUrl}users/${id}`,
        {
          userCanWithdraw: true,
        },
        { headers: { token: adminToken } }
      )
      .then((data) => {
        console.log(data);
        if (data.status === 200) {
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
            onChange={(e) => setbonus(e.target.value)}
            defaultValue={userDetails.otp}
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
          title={"Update OTP"}
          background={"var(--secondary-color)"}
          color={"#FFF"}
          width={"43%"}
          height={45}
          navigate={() => ""}
        />
        <div className="add_food_item_form_item_four">
          <p className="add_food_item_form_labels">OTP Message</p>
          <input
            type="text"
            className="food_item_inputs"
            placeholder="OTP Message"
            {...register("otpMessage")}
            defaultValue={userDetails.otpMessage}
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
          title={"Update Message"}
          background={"var(--secondary-color)"}
          color={"#FFF"}
          width={"43%"}
          height={45}
          navigate={() => ""}
        />
        <div className="add_food_item_form_item_four">
          <p className="add_food_item_form_labels">OTP Step</p>
          <input
            type="text"
            className="food_item_inputs"
            placeholder="OTP Step"
            {...register("otpStep")}
            defaultValue={userDetails.otpStep}
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
          title={"Update Step"}
          background={"var(--secondary-color)"}
          color={"#FFF"}
          width={"43%"}
          height={45}
          navigate={() => ""}
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
