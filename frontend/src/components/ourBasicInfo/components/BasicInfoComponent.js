import React from "react";

const BasicInfoComponent = (props) => {
  const { img, title, subtitle } = props;
  return (
    <>
      <div className="shipping">
        <img src={img} alt="" />
        <div className="content">
          <h3>{title}</h3>
          <p>{subtitle}</p>
        </div>
      </div>
    </>
  );
};


export default BasicInfoComponent;
