import React, { Fragment } from "react";
import "./Contact.css";
import GitHubIcon from "@mui/icons-material/GitHub";
import MetaData from "../MetaData";

const Contact = () => {
  return (
    <Fragment>
      <MetaData title="Contact Us ©ShopKart™" />
      <div className="contactContainer">
        <h4>For any queries:</h4>
        <h2>Mail us</h2>
        <a className="emailBlock" href="emailto:mexcellshar@gmail.com">
          <h1>mexcellshar@gmail.com</h1>
        </a>

        <a className="svgIcon" href="https://github.com/MS2407">
          {" "}
          <GitHubIcon />
        </a>
      </div>
    </Fragment>
  );
};

export default Contact;
