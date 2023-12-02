import React, { useState } from "react";
import "./UpdateProfile.css";
import { Button, DashHead } from "../../components";
import axios from "axios";
import { useGlobalContext } from "../../context/context";
import { useForm } from "react-hook-form";
import { ColorRing } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateProfile = () => {
  const [loading, setLoading] = useState(false);
  const { baseUrl } = useGlobalContext();
  const adminToken = JSON.parse(sessionStorage.getItem("adminToken"));
  const { handleSubmit, register } = useForm();

  const notify = () => toast.success("Password Successfully Updated");

  const updateAdminPassword = (data) => {
    setLoading(true);
    axios
      .patch(`${baseUrl}/auth/admin/update-password`, data, {
        headers: { Authorization: `Bearer ${adminToken}` },
      })
      .then((data) => {
        setLoading(false);
        notify();
      })
      .catch((error) => {
        setLoading(false);
      });
  };

  return (
    <section className="update_profile">
      <DashHead
        title={"Update Password"}
        paragraph={"Make updates on your Password"}
      />
      <div>
        <div className="updata_profile_last_child">
          <div>
            <h3 style={{ marginBottom: 20 }} className="dashboard_header_text">
              Change password
            </h3>
            <p className="dashboard_paragraph">
              You can change your password anytime for security reasons or to
              reset it
            </p>
          </div>
          <form
            className="add_food_item_form"
            onSubmit={handleSubmit((data) => updateAdminPassword(data))}
          >
            <div className="add_food_item_form_item_four">
              <p className="add_food_item_form_labels">New Password</p>
              <input
                type="text"
                className="food_item_inputs"
                placeholder="New Password"
                {...register("password")}
              />
            </div>
            <Button
              title={"Update password"}
              background={"var(--secondary-color)"}
              color={"#FFF"}
              width={"100%"}
              height={50}
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
              navigate={() => ""}
            />
          </form>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
};

export default UpdateProfile;
