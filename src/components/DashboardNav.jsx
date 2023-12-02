import React from "react";
import { Link, useNavigate } from "react-router-dom";

const DashboardNav = ({ navItems, toggleVisibility, visibility }) => {
  const navigate = useNavigate();
  return (
    <nav className={`dashboard_nav ${visibility ? "show_nav" : ""}`}>
      <>
        {navItems.map((item, index) => {
          const { category, details } = item;
          return (
            <div key={index}>
              <p className="nav_list_category">{category}</p>
              <div onClick={toggleVisibility}>
                {details?.map((list, indx) => {
                  const { img, name, path } = list;
                  return (
                    <Link
                      onClick={() => {
                        if (name === "Logout") {
                          sessionStorage.removeItem("adminToken");
                        }
                      }}
                      to={`/${path}`}
                      className={`nav_items`}
                      key={indx}
                    >
                      <img src={img} alt={name} className="nav_image" />
                      <p className="nav_list_category">{name}</p>
                    </Link>
                  );
                })}
              </div>
            </div>
          );
        })}
      </>
    </nav>
  );
};

export default DashboardNav;
