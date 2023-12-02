import React from "react";
import "./FoodItems.css";
import { Button, DashHead, TableBody } from "../../components";
import { FiSearch } from "react-icons/fi";
import { RxCaretLeft, RxCaretRight } from "react-icons/rx";
import { AiOutlinePlus } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const FoodItems = () => {
  const navigate = useNavigate();
  return (
    <section className="food_items_sect">
      <DashHead
        title={"Food Item"}
        paragraph={"View all food item in Bells"}
        btn={
          <Button
            icon={<AiOutlinePlus />}
            title={"Add food item"}
            height={40}
            width={171}
            background={"var(--secondary-color)"}
            color={"#fff"}
            navigate={() => navigate("/add_food_item")}
          />
        }
      />
      <div className="food_item_search">
        <p className="food_item_paragraphs">Search by: </p>
        <input
          className="food_item_inputs"
          type="text"
          placeholder="Customer name"
        />
        <Button
          icon={<FiSearch />}
          background={"var(--secondary-color)"}
          color={"#fff"}
          height={34}
          width={34}
        />
        <p className="food_item_paragraphs">Status</p>
        <input className="food_item_inputs" type="text" />
      </div>
      <div className="food_item_table">
        <div className="food_item_table_header">
          <h4>All food item</h4>
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
        <TableBody path={"edit_food_item"} />
      </div>
    </section>
  );
};

export default FoodItems;
