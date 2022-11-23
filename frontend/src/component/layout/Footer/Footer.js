import React from 'react';
import playstore from "../../../images/playstore.png"
import appstore from "../../../images/appstore.png"
import {AiOutlineInstagram,AiOutlineFacebook,AiOutlineYoutube} from "react-icons/ai";
import "./Footer.css"

const Footer = () => {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <h4>DOWNLOAD OUR APP</h4>
        <p>Download App for Android and IOS mobile phone</p>
        <img src={playstore} alt="playstore"></img>
        <img src={appstore} alt="appstore"></img>

      </div>
      <div className="midFooter">
          <h1>ShopKart™</h1>
          <p>Highest Quality is Our First Priority</p>
          <p>Copyrights 2022 &copy; MS98</p>
      </div>
      <div className="rightFooter">
        <h4>Follow us On</h4>
        <a href="http://instagram.com/shopkart"><AiOutlineInstagram/> Instagram</a>
        <a href="http://youtube.com/shopkart"><AiOutlineYoutube/> Youtube</a>
        <a href="http://fb.com/shopkart"><AiOutlineFacebook/> Facebook</a>

      </div>
    </footer>
  )
}

export default Footer