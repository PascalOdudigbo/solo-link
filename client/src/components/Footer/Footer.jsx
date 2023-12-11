import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";

function Footer(){
    const navigate = useNavigate();
    return(
        <div className="footer_wrapper">
            <img className="footer_logo" src={logo} alt="logo" onClick={()=>{
                navigate("/")
            }}/>
            <h4 className="copyright_text p__opensans">{`©${new Date().getFullYear()} Solo Link`}</h4>
        </div>
    );

}
export default Footer;