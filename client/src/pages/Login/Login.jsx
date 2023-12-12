import React, { useEffect, useState } from "react";
import logo from "../../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login({ setArtistData, hideAlert, setAlertDisplay, setAlertStatus, setAlertMessage, verifyLoginStatus}) {
  const [artistEmail, setArtistEmail] = useState("");
  const [artistPassword, setArtistPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate("");


  useEffect(() => {
    verifyLoginStatus();
  }, [verifyLoginStatus]);

  // A function to handle artist login
  function handleOnSubmit(e) {
    e.preventDefault();
    window.scrollTo(0, 0);
    setIsLoading(true);

    const loginData = {
      email: artistEmail,
      password: artistPassword
    }

    axios.post(`/login`, loginData)
      .then(res => {
        setIsLoading(false);
        setArtistData(res.data)
        // localStorage.setItem("userId", JSON.stringify(res.data.id));
        setAlertStatus(true);
        setAlertDisplay("block");
        setAlertMessage("Login successful!");
        hideAlert();
        setTimeout(() => navigate("/home"), 1000);
      })
      .catch(error => {
        setIsLoading(false);
        if (error.response) {
          setAlertStatus(false);
          setAlertDisplay("block");
          setAlertMessage(`${error.response.data.error}`);
          hideAlert();
        }
      })

  }

  return (
    <div className="login_component_container">
     
      <div className="login_form_Container">
        <img onClick={() => navigate("/")} className="login_logo" src={logo} alt="logo"/>
        <h1 className="login_text p__cormorant">LOGIN</h1>
        <form className="login_form" onSubmit={handleOnSubmit}>

          <div className="loginFormTextAndInputContainer">
            <p className="loginFormText">Email</p>
            <input className="loginFormInput"
              required
              value={artistEmail}
              onChange={(e) => setArtistEmail(e.target.value)}
            />
          </div>

          <div className="loginFormTextAndInputContainer">
            <p className="loginFormText">Password (required)</p>
            <input className="loginFormInput"
              type="password"
              value={artistPassword}
              required
              onChange={(e) => setArtistPassword(e.target.value)}
            />
          </div>

          <Link className="forgot_password_link" to={"/forgot-password"}>forgot password?</Link>
          <button className="login_btn custom__button" type="submit">
            {isLoading ? <div className="loader"></div> : "Login"}
          </button>
          <p className="or_text">or</p>
          <Link className="sign_up_link custom__button" to={"/signUp"}>Sign Up</Link>
        </form>
      </div>

    </div>
  );
}

export default Login;
