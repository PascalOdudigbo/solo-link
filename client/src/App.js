import React, { useCallback, useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { ArtistHome, ConfirmEmail, EditProfile, FansViewArtists, ForgotPassword, Home, Login, ResetPassword, SignUp } from './pages'
import { Footer, Alert } from './components'
import emailjs from "@emailjs/browser";

function App() {
    // Creating state variables to handle dynamic data
    const [artistData, setArtistData] = useState({});
    const [alertDisplay, setAlertDisplay] = useState("none");
    const [alertStatus, setAlertStatus] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    // Creating navigation variable function
    const navigate = useNavigate("");

    // A function to hide alert
    const hideAlert = useCallback(() => {
        let timeOut = setTimeout(
            () => {
                setAlertDisplay("none");
                clearTimeout(timeOut);
            }, 1000, setAlertDisplay);
    }, []);

    //creating a function to send multi-factor auth email 
    function sendEmail(templateID, emailValues, alertMessage, navigationFunction) {
        const serviceID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
        const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;

        emailjs.send(serviceID, templateID, emailValues, publicKey).then(
            () => {
                setAlertStatus(true);
                setAlertMessage(alertMessage);
                setAlertDisplay("block");
                hideAlert();
                navigationFunction()
            },
            (err) => {
                setAlertStatus(false);
                setAlertMessage(JSON.stringify(err));
                setAlertDisplay("block");
                hideAlert();
            }
        );
    }

    // A function to verify artist is logged in 
    const verifyLoginStatus = useCallback(() => {
        fetch("/artists_logged_in")
            .then(res => res.json())
            .then(artistData => {
                if (artistData?.id) {
                    if (artistData?.verified === true) {
                        setArtistData(artistData);
                        (window.location.href.includes("signUp") || window.location.href.includes("login")) && navigate("/home")
                    } else {
                        setAlertStatus(false);
                        setAlertDisplay("block");
                        setAlertMessage("Verification email sent, please verify your email address!");
                        hideAlert();
                        setTimeout(() => navigate("/"), 3000);
                    }
                }

            })
            .catch(error => {
                setAlertStatus(false)
                setAlertDisplay("block");
                setAlertMessage(error);
                hideAlert();
            })
    }, [hideAlert, navigate, setAlertDisplay, setArtistData])

    // A function to verify login status and set all artist data
    const fetchArtistData = useCallback((setAllDataAgain) => {
        fetch("/artists_logged_in")
            .then((res) => res.json())
            .then((artistData) => {
                if (artistData) {
                    if (artistData?.verified === true) {
                        setArtistData(artistData);
                        setAllDataAgain(artistData);
                    } else {
                        setAlertStatus(false);
                        setAlertDisplay("block");
                        setAlertMessage(
                            "Verification email sent, please verify your email address!"
                        );
                        hideAlert();
                        setTimeout(() => navigate("/"), 3000);
                    }
                } else {
                    navigate("/");
                }
            })
            .catch((error) => {
                setAlertStatus(false);
                setAlertDisplay("block");
                setAlertMessage(error);
                hideAlert();
            });
    }, [hideAlert, navigate, setAlertDisplay, setArtistData]);

    useEffect(() => {
        // verifyLoginStatus()
    }, []);

    return (
        <>
            <div className="alertContainer">
                <Alert
                    requestStatus={alertStatus}
                    alertMessage={alertMessage}
                    display={alertDisplay}
                />
            </div>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login"
                    element={
                        <Login
                            setArtistData={setArtistData}
                            hideAlert={hideAlert}
                            setAlertDisplay={setAlertDisplay}
                            setAlertStatus={setAlertStatus}
                            setAlertMessage={setAlertMessage}
                            verifyLoginStatus={verifyLoginStatus}
                        />
                    }
                />
                <Route path='/signUp' element={
                    <SignUp
                        setArtistData={setArtistData}
                        hideAlert={hideAlert}
                        setAlertDisplay={setAlertDisplay}
                        setAlertStatus={setAlertStatus}
                        setAlertMessage={setAlertMessage}
                        sendEmail={sendEmail}
                    />
                } />
                <Route
                    path="/confirm-email/*"
                    element={
                        <ConfirmEmail
                            hideAlert={hideAlert}
                            setAlertDisplay={setAlertDisplay}
                            setAlertStatus={setAlertStatus}
                            setAlertMessage={setAlertMessage}
                        />
                    }
                />

                <Route
                    path="/forgot-password"
                    element={
                        <ForgotPassword
                            hideAlert={hideAlert}
                            alertDisplay={alertDisplay}
                            setAlertDisplay={setAlertDisplay}
                            setAlertStatus={setAlertStatus}
                            setAlertMessage={setAlertMessage}
                            sendEmail={sendEmail}
                        />
                    }
                />
                <Route
                    path="/reset-password/*"
                    element={
                        <ResetPassword
                            hideAlert={hideAlert}
                            setAlertDisplay={setAlertDisplay}
                            setAlertStatus={setAlertStatus}
                            setAlertMessage={setAlertMessage}
                        />
                    }
                />
                <Route
                    path="/home/*"
                    element={
                        <ArtistHome
                            verifyLoginStatus={fetchArtistData}
                            artistData={artistData}
                            setArtistData={setArtistData}
                            hideAlert={hideAlert}
                            setAlertDisplay={setAlertDisplay}
                            setAlertStatus={setAlertStatus}
                            setAlertMessage={setAlertMessage}
                        />
                    }
                />
                <Route
                    path="/edit-profile"
                    element={
                        <EditProfile
                            artistData={artistData}
                            setArtistData={setArtistData}
                            hideAlert={hideAlert}
                            setAlertDisplay={setAlertDisplay}
                            setAlertStatus={setAlertStatus}
                            setAlertMessage={setAlertMessage}
                            fetchArtistData={fetchArtistData}
                        />
                    }
                />
                <Route
                    path="/view-artist/*"
                    element={
                        <FansViewArtists/>
                    }

                />



            </Routes>

            <Footer />

        </>

    )
}

export default App
