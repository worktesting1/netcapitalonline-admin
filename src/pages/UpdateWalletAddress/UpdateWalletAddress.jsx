import React, { useState } from "react";
import "./WalletAddress.css";
import { Button, DashHead } from "../../components";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useGlobalContext } from "../../context/context";
import { useForm } from "react-hook-form";
import { ColorRing } from "react-loader-spinner";

const UpdateWalletAddress = () => {
  const { id } = useParams();
  const adminToken = JSON.parse(sessionStorage.getItem("adminToken"));
  const { baseUrl } = useGlobalContext();
  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);

  const updateWalletAddress = (data) => {
    if (data.address.length > 0) {
      setLoading(true);
      axios
        .patch(
          `${baseUrl}/admin-wallets/${id}`,
          { address: data.address },
          { headers: { Authorization: `Bearer ${adminToken}` } }
        )
        .then((data) => {
          if (data.status === 200) {
            setLoading(false);
            navigate("/wallet-address");
          }
        })
        .catch((error) => {
          setLoading(false);
        });
    }
  };
  return (
    <section className="wallet_address">
      <DashHead
        title={"Change Wallet Address Here"}
        paragraph={"Change wallet address to update on user end"}
      />
      <form
        className="add_food_item_form"
        onSubmit={handleSubmit((data) => updateWalletAddress(data))}
      >
        <div className="add_food_item_form_item_five">
          <p className="add_food_item_form_labels">Change Address</p>
          <input
            type="text"
            className="food_item_inputs"
            placeholder="Change Address"
            {...register("address", {
              required: "Address input must not be empty",
            })}
          />

          {errors.address?.message && (
            <p style={{ color: "red" }}>{errors.address?.message}</p>
          )}
        </div>
        <button>
          <span>Update Address</span>
          {loading && (
            <ColorRing
              visible={true}
              height="30"
              width="30"
              ariaLabel="blocks-loading"
              wrapperStyle={{}}
              wrapperClass="blocks-wrapper"
              colors={["#fff", "#fff", "#fff", "#fff", "#fff"]}
            />
          )}
        </button>
      </form>
    </section>
  );
};

export default UpdateWalletAddress;
