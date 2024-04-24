import React, { useState } from "react";
import "./DashboardHeader.css";
import LoginImageHero from "../../asset/Logo (5).png";
import { RiMenu3Line } from "react-icons/ri";

const DashboardHeader = ({ toggleVisibility }) => {
  return (
    <header className="dashboard_header">
      <img src={LoginImageHero} alt="" className="hero_login_image" />
      <RiMenu3Line onClick={toggleVisibility} />
      <div className="profile">
        <h3 className="profile_text">CL</h3>
      </div>
    </header>
  );
};

export default DashboardHeader;
