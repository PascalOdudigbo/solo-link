import React, { useState } from "react";
import axios from "axios";
import logo from "../../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";


function ForgotPassword({ hideAlert, setAlertDisplay, setAlertStatus, setAlertMessage, sendEmail}) {

    const [isLoading, setIsLoading] = useState(false);
    // defining a navigation variable function
    const navigate = useNavigate("");
    // declaring state variables to handle dynamic form inputs
    const [artistEmail, setArtistEmail] = useState("");

    const deployedURL = "https://solo-link-wad4.onrender.com/"

    // A function to handle account recovery
    function handleAccountRecovery(e) {
        e.preventDefault();
        window.scrollTo(0, 0);
        setIsLoading(true);
        const artistData = {
            email: artistEmail
        }

        axios.post("/artists_recover_account", artistData)
            .then((res) => {
                setIsLoading(false);
                setAlertStatus(true);
                setAlertMessage("Account located!");
                setAlertDisplay("block");
                hideAlert();

                const emailValues = {
                    stage_name: res.data.stage_name,
                    artist_email: artistEmail,
                    reset_password_link: `${deployedURL}/reset-password/${res.data.id}`
                };

                // sending account recovery email
                sendEmail(process.env.REACT_APP_EMAILJS_RESET_PASSWORD_TEMPLATE_ID, emailValues, "Account recovery link sent!", () => { setTimeout(() => navigate("/"), 5000) })
            })
            .catch((error) => {
                setIsLoading(false);
                if (error.response) {
                    setAlertStatus(false);
                    error.response.data.error ? setAlertMessage(error.response.data.error) : setAlertMessage("Email isn't linked to any account!");
                    setAlertDisplay("block");
                    hideAlert();
                }
            });

    }

    return (
        <div className="forgotPasswordContainer">
            
            <div className="forgotPasswordLogoAndLinksContainer">
                <img onClick={() => navigate("/")} className="forgotPasswordLogo" src={logo} alt={"logo"} />
                <div className="forgotPasswordLinksContainer">
                    <Link className="forgotPasswordLoginLink custom__button" to={"/login"}>LOGIN</Link>
                    <Link className="forgotPasswordSignUpLink custom__button" to={"/signUp"}>SIGN UP</Link>
                </div>
            </div>

            <div className="forgotPasswordBody">
                <h1 className="forgot_password_heading headtext__cormorant">ACCOUNT RECOVERY</h1>
                <p className="p_opensans forgot_password_body_text">
                    Forgot your password? Don't sweat it.
                    <br />
                    Simply input the email you used to sign up below and a recovery link will be sent to you.
                </p>
            </div>

            <form className={"forgotPasswordForm"} onSubmit={handleAccountRecovery}>
                <div className="forgotPasswordFormTextAndInputContainer">
                    <p className="forgotPasswordFormText">Email</p>
                    <input className="forgotPasswordFormInput"
                        required
                        value={artistEmail}
                        onChange={(e) => setArtistEmail(e.target.value)}
                    />
                </div>

                <button className="submitBtn custom__button" type="submit">
                    {isLoading ? <div className="loader"></div> : "Submit"}
                </button>
            </form>

        </div>
    );

}
export default ForgotPassword;