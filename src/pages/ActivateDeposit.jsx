import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { Button } from "../components";
import { MdCheckCircle } from "react-icons/md";

const ActivateDeposit = ({
  toggleActivateDeposit,
  updateStatus,
  updateDepositApproved,
  id,
  depositLoading,
  failedLoading,
  endPoint,
  updateKYC,
  kYCId,
}) => {
  return (
    <>
      {endPoint === "kyc" ? (
        <section className="notification_modal">
          <div style={{ width: 450 }} className="notification_container">
            <div className="add_food_item_header">
              <h3 className="dashboard_header_text"></h3>
              <div className="go_back">
                <AiOutlineClose onClick={toggleActivateDeposit} size={20} />
              </div>
            </div>
            <div className="close_container">
              <MdCheckCircle color={`var(--secondary-color)`} size={50} />
              <h3>Update KYC Status</h3>
              <p>Click Approved to update user status to True on user end</p>
            </div>
            <div className="notification_flex">
              <Button
                background={"var(--secondary-color)"}
                title={failedLoading ? "loading..." : "Approved"}
                width={"100%"}
                height={40}
                fontsize={15}
                color={"var(--color2)"}
                navigate={() => updateKYC(kYCId)}
              />

              {endPoint === "kyc" ? (
                ""
              ) : (
                <Button
                  background={"var(--other-color)"}
                  title={failedLoading ? "loading..." : "Failed"}
                  width={"50%"}
                  height={40}
                  fontsize={15}
                  color={"white"}
                  navigate={() => ""}
                />
              )}
            </div>
          </div>
        </section>
      ) : updateStatus ? (
        <section className="notification_modal">
          <div style={{ width: 450 }} className="notification_container">
            <div className="add_food_item_header">
              <h3 className="dashboard_header_text"></h3>
              <div className="go_back">
                <AiOutlineClose onClick={toggleActivateDeposit} size={20} />
              </div>
            </div>
            <div className="close_container">
              <MdCheckCircle color={`var(--secondary-color)`} size={50} />
              <h3>Update Deposit Status</h3>
              <p>
                Click Failed to change status to failed or Click approved to
                approved status
              </p>
            </div>
            <div className="notification_flex">
              <Button
                background={"var(--secondary-color)"}
                title={depositLoading ? "loading..." : "Approved"}
                width={"50%"}
                height={40}
                fontsize={15}
                color={"var(--color2)"}
                navigate={() => updateDepositApproved(id)}
              />

              <Button
                background={"var(--other-color)"}
                title={failedLoading ? "loading..." : "Failed"}
                width={"50%"}
                height={40}
                fontsize={15}
                color={"white"}
                navigate={() => ""}
              />
            </div>
          </div>
        </section>
      ) : (
        ""
      )}
    </>
  );
};

export default ActivateDeposit;
