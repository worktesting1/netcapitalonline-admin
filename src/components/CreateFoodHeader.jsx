import React from "react";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import Button from "./Button/Button";

const CreateFoodHeader = ({ btn, navigateBack, title, navigate }) => {
  return (
    <>
      <div className="add_food_item_header_container">
        <div className="add_food_item_header">
          <div className="go_back" onClick={navigateBack}>
            <MdOutlineArrowBackIosNew size={20} />
          </div>
          <h3 className="dashboard_header_text">{title}</h3>
        </div>
        {btn && (
          <Button
            background={"var(--secondary-color)"}
            height={40}
            width={166}
            title={"Update User Details"}
            color={"#fff"}
            navigate={navigate}
          />
        )}
      </div>
    </>
  );
};

export default CreateFoodHeader;
