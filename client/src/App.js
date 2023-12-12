import React, { useCallback, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { Home, Login } from './pages'
import { Footer, Alert } from './components'

function App() {
    // Creating state variables to handle dynamic data
    const [artistData, setArtistData] = useState({});
    const [alertDisplay, setAlertDisplay] = useState("block");
    const [alertStatus, setAlertStatus] = useState(false);
    const [alertMessage, setAlertMessage] = useState("Invalid email or password!");
    // Creating navigation variable function
    const navigate = useNavigate("");

    // A function to hide alert
    const hideAlert = useCallback(() => {
        let timeOut = setTimeout(
          () => {
            setAlertDisplay("none");
            clearTimeout(timeOut);
          },
          1000,
          setAlertDisplay
        );
      }, []);

    // A function to verify artist is logged in 
    const verifyLoginStatus = useCallback(() => {
        fetch("/meArtist")
            .then(res => res.json())
            .then(artistData => {
                if (artistData?.id) {
                    if (artistData?.verified === true) {
                        setArtistData(artistData);
                        navigate("/home")
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
            </Routes>

            <Footer />

        </>

    )
}

export default App
