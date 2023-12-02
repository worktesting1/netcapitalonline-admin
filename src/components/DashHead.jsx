import React from "react";

const DashHead = ({ title, paragraph, btn }) => {
  return (
    <div className="dash_head">
      <div>
        <h3 className="dashboard_header_text">{title}</h3>
        <p className="dashboard_paragraph">{paragraph}</p>
      </div>
    </div>
  );
};

export default DashHead;
