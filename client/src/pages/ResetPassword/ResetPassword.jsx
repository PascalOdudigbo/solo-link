import React, { useState } from "react";
import axios from "axios";
import logo from "../../assets/logo.png";
import { useNavigate } from "react-router-dom";

function ResetPassword({ hideAlert, setAlertDisplay, setAlertStatus, setAlertMessage, }) {
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    // A function to handle password reset
    function handlePasswordReset(e) {
        e.preventDefault();
        const currentLink = window.location.href;
        setIsLoading(true);
        currentLink.split("/");

        if (password !== passwordConfirmation) {
            setIsLoading(false);
            setAlertDisplay("block");
            setAlertStatus(false);
            setAlertMessage("Password and Confirm Password don't match!")
            hideAlert();
        } else {
            const artistData = {
                password: password
            }
            axios.patch(`/artists/${currentLink[currentLink.length - 1]}`, artistData)
                .then(res => {
                    setIsLoading(false);
                    setAlertStatus(true);
                    setAlertDisplay("block");
                    setAlertMessage("Password reset sucessful!");
                    hideAlert();
                    setTimeout(() => navigate("/login"), 3000);

                })
                .catch(error => {
                    setIsLoading(false);
                    if (error.response) {
                        setAlertStatus(false);
                        setAlertDisplay("block");
                        setAlertMessage(`${error.response.data.error}`);
                        hideAlert();
                    }
                });
        }

    }

    return (
        <div className="resetPasswordContainer">
            <div className="resetPasswordFormContainer">
                <img
                    onClick={() => navigate("/")}
                    className="resetPasswordLogo"
                    src={logo}
                    alt="logo"
                />
                <h1 className="resetPasswordText p__cormorant">RESET PASSWORD</h1>
                <form className={"resetPasswordForm"} onSubmit={handlePasswordReset}>
                    <div className="resetPasswordFormTextAndInputContainer">
                        <p className="resetPasswordFormText">Password (required)</p>
                        <input className="resetPasswordFormInput"
                            required
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>


                    <div className="resetPasswordFormTextAndInputContainer">
                        <p className="resetPasswordFormText">Password Confirmation (required)</p>
                        <input className="resetPasswordFormInput"
                            required
                            type="password"
                            value={passwordConfirmation}
                            onChange={(e) => setPasswordConfirmation(e.target.value)}
                        />
                    </div>

                    <button className="resetPasswordBtn custom__button" type="submit">
                        {isLoading ? <div className="loader"></div> : "Confirm"}
                    </button>
                </form>
            </div>
        </div>
    );

}
export default ResetPassword;