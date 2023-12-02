import React from "react";
import circel_close from "../asset/close-circle.svg";
import { AiOutlineClose } from "react-icons/ai";
import { Button } from "../components";
import { ColorRing } from "react-loader-spinner";

const DeleteCustomerModal = ({
  toggleDeleteCustomers,
  removeCustomer,
  deleteUser,
  loading,
}) => {
  return (
    <>
      {removeCustomer && (
        <section className="notification_modal">
          <div className="notification_container">
            <div className="add_food_item_header">
              <h3 className="dashboard_header_text"></h3>
              <div className="go_back">
                <AiOutlineClose onClick={toggleDeleteCustomers} size={20} />
              </div>
            </div>
            <div className="close_container">
              <img src={circel_close} alt="" />
              <h3>Delete</h3>
              <p>
                Are you sure you want to permanently delete this User(This
                action cannot be undone)
              </p>
            </div>
            <div className="notification_flex">
              <Button
                background={"var(--color2)"}
                title={"Cancel"}
                width={"50%"}
                height={40}
                fontsize={15}
                color={"var(--color1)"}
                navigate={toggleDeleteCustomers}
                border={`1px solid black`}
              />
              <Button
                background={"var(--other-color)"}
                title={
                  loading ? (
                    <ColorRing
                      visible={true}
                      height="30"
                      width="30"
                      ariaLabel="blocks-loading"
                      wrapperStyle={{}}
                      wrapperClass="blocks-wrapper"
                      colors={["white", "white", "white", "white", "white"]}
                    />
                  ) : (
                    "Yes"
                  )
                }
                width={"50%"}
                height={40}
                fontsize={15}
                color={"white"}
                navigate={deleteUser}
              />
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default DeleteCustomerModal;
