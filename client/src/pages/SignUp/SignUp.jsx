import React, { useState } from "react";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function SignUp({setArtistData, hideAlert, setAlertDisplay, setAlertStatus, setAlertMessage, sendEmail}) {
  
  // defining a navigation variable function
  const navigate = useNavigate("");
  // declaring state variables to handle dynamic form inputs
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [stageName, setStageName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const deployedURL = "https://solo-link-wad4.onrender.com/"

  // A function to handle signup
  function handleSignUp(e) {
    e.preventDefault();
    window.scrollTo(0, 0);
    setIsLoading(true);

    // Validating password and password confirmation
    if (password !== passwordConfirmation) {
      setIsLoading(false);
      setAlertDisplay("block");
      setAlertStatus(false);
      setAlertMessage("Password and Confirm Password don't match !");
      hideAlert();
      
    } else {
      // Organizing signup data
      const postData = {
        first_name: firstName,
        last_name: lastName,
        stage_name: stageName,
        email: email,
        verified: false,
        password: password,
        password_confirmation: passwordConfirmation,
      };

      

      axios
        .post(`/artists`, postData)
        .then((res) => {
          setIsLoading(false);
          setAlertStatus(true);
          setArtistData(res.data);
          setAlertMessage("Signup successful!");
          setAlertDisplay("block");
          hideAlert();

          const emailValues = {
            stage_name: stageName,
            artist_email: email,
            confirmation_link: `${deployedURL}/confirm-email/${res.data.id}`,
          };

          // sending email confirmation email
          sendEmail(process.env.REACT_APP_EMAILJS_VERIFY_EMAIL_TEMPLATE_ID, emailValues, "Email confirmation link sent!", ()=>{setTimeout(() => navigate("/"), 4000)})
        })
        .catch((error) => {
          setIsLoading(false);
          if (error.response) {
            setAlertStatus(false);
            error.response.data.error
              ? setAlertMessage(error.response.data.error)
              : setAlertMessage("SignUp unsuccessful, please try again !");
            setAlertDisplay("block");
            hideAlert();
          }
        });
    }
  }

  return (
    <div className="signUpContainer">
      <div className="signUpFormContainer">
        <img className={"signUpLogo"}  onClick={() => navigate("/")}  src={logo}  alt="logo"  />
        <h1 className="signUpText p__cormorant">SIGN UP</h1>

        <form className="signUpForm" onSubmit={handleSignUp}>
          <div className="signUpFormTextAndInputContainer">
              <p className="signUpFormText">First Name (required)</p>
              <input className="signUpFormInput"
                required
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
          </div>

          <div className="signUpFormTextAndInputContainer">
              <p className="signUpFormText">Last Name (required)</p>
              <input className="signUpFormInput"
                required
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
          </div>

          <div className="signUpFormTextAndInputContainer">
              <p className="signUpFormText">Stage Name (required)</p>
              <input className="signUpFormInput"
                required
                type="text"
                value={stageName}
                onChange={(e) => setStageName(e.target.value)}
              />
          </div>

          <div className="signUpFormTextAndInputContainer">
              <p className="signUpFormText">Email (required)</p>
              <input className="signUpFormInput"
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
          </div>

          <div className="signUpFormTextAndInputContainer">
              <p className="signUpFormText">Password (required)</p>
              <input className="signUpFormInput"
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
          </div>


          <div className="signUpFormTextAndInputContainer">
              <p className="signUpFormText">Password Confirmation (required)</p>
              <input className="signUpFormInput"
                required
                type="password"
                value={passwordConfirmation}
                onChange={(e) => setPasswordConfirmation(e.target.value)}
              />
          </div>

          
          <button type="submit" className="signUpBtn custom__button">
            {isLoading ?  <div class="loader"> </div> : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
}
export default SignUp;
