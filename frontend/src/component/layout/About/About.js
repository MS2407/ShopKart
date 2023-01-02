import React, { Fragment } from "react";
import "./About.css";
import { Avatar } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import IntegrationInstructionsIcon from "@mui/icons-material/IntegrationInstructions";
import MetaData from "../MetaData";
const About = () => {
  return (
    <Fragment>
      <MetaData title="About Us ©ShopKart™" />
      <div className="aboutSection">
        <div className="temp1"></div>
        <div className="aboutSectionGradient"></div>
        <div className="aboutSectionContainer">
          <h1>About Us</h1>
          <div>
            <div>
              <Avatar
                src="https://res.cloudinary.com/duu22a3yk/image/upload/v1669146959/avatars/shrcxl7i5uho6c6u6ak6.jpg"
                alt="MS98"
              />
              <h2>MS98</h2>
              <a href="https://github.com/MS2407" className="ghAnchor">
                <GitHubIcon />
              </a>
              <span>
                This is a sample website designed using MERN Stack by{" "}
                <span className="secondSpan"> MS98</span>
              </span>
            </div>
            <div className="aboutSectionContainer2">
              <h2>Other Important Links</h2>
              <a href="https://leetcode.com/MS98/">
                Leetcode
                <IntegrationInstructionsIcon />
              </a>
              <a href="https://www.hackerrank.com/mexcellshar">
                HackerRank
                <IntegrationInstructionsIcon />
              </a>
              <a href="https://www.codingninjas.com/codestudio/profile/MS24">
                CodingNinjas
                <IntegrationInstructionsIcon />
              </a>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default About;
