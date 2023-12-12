import React, { useState } from "react";
import axios from "axios";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";

function ConfirmEmail({ hideAlert, setAlertDisplay, setAlertStatus, setAlertMessage }) {
  // declaring the loading state variable
  const [isLoading, setIsLoading] = useState(false);
  // defining the navigation variable function
  const navigate = useNavigate();

  // A function to confirm artist email
  function handleEmailConfirmation(){
    const currentLink = window.location.href;
        setIsLoading(true);
        currentLink.split("/");

        const artistData = {
            verified: true
        }
        axios.patch(`/artists/${currentLink[currentLink.length -1]}`, artistData)
        .then(res => {
            setIsLoading(false);
            setAlertStatus(true);
            setAlertDisplay("block");
            setAlertMessage("Email confirmed sucessful!");
            hideAlert();
            setTimeout(()=> navigate("/login"), 2000);
    
        })
        .catch(error =>{
            setIsLoading(false);
            if(error.response){
                setAlertStatus(false);
                setAlertDisplay("block");
                setAlertMessage(`${error.response.data.error}`);
                hideAlert();
            }      
        })

  }

  return (
    <div className="confirmEmailContainer">
      <div className="confirmEmailBody">
        <img onClick={() => navigate("/")} className="confirmEmailLogo" src={logo} alt={"logo"}/>

        <p className="confirmEmailBodyText p__opensans">Click on the button below to confirm your email address.</p>

        <button className="confirmEmailBtn custom__button" onClick={handleEmailConfirmation}>
          {isLoading ? <div className="loader"></div> : "Confirm"}
        </button>
      </div>
    </div>
  );
}
export default ConfirmEmail;
