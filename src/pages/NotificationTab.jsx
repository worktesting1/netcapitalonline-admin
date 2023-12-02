import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import { Button } from "../components";

const NotificationTab = ({ notification, toggleNotification }) => {
  return (
    <>
      {notification && (
        <div className="notification_modal">
          <div className="notification_container">
            <div className="add_food_item_header">
              <h3 className="dashboard_header_text">Send Notification</h3>
              <div className="go_back">
                <AiOutlineClose onClick={toggleNotification} size={20} />
              </div>
            </div>
            <p className="add_food_item_form_labels">Type</p>
            <div className="order_details_flex">
              <div>
                <p>Alert</p>
                <MdOutlineKeyboardArrowDown size={18} color="var(--color1)" />
              </div>
            </div>
            <p className="add_food_item_form_labels">Message</p>
            <textarea className="notification_container_textarea"></textarea>
            <div className="notification_flex">
              <Button
                background={"var(--color2)"}
                title={"Cancel"}
                width={168}
                height={40}
                fontsize={15}
                color={"var(--color1)"}
                navigate={toggleNotification}
              />
              <Button
                background={"var(--secondary-color)"}
                title={"Send"}
                width={168}
                height={40}
                fontsize={15}
                color={"white"}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default NotificationTab;
