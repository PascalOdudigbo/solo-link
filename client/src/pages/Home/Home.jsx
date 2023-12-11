import React from 'react'
import logo from "../../assets/logo.png";
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div className="home_wrapper">
            <div className="home_logo_and_links_wrapper">
                <img className="home_logo" src={logo} alt={"logo"} />
                <div className="home_links_container">
                    <Link className="home_login_link custom__button" to={"/login"}>LOGIN</Link>
                    <Link className="home_sign_up_link custom__button" to={"/signUp"}>SIGN UP</Link>
                </div>
            </div>

            <div className="home_page_body">
                <h1 className='headtext__cormorant home_heading'>The best link in bio for artists</h1>
                <p className='p_opensans home_body_text'>
                    Connect your music, videos, social media and information under a
                    "solo link".
                    <br />
                    Add your unique URL to all platforms accessible to your fanbase.
                </p>
            </div>

            <Link className="custom__button home_get_started_link" to={"/signUp"}>Get started for free</Link>

            <div className="footerContainer">
                
            </div>

        </div>

    )
}

export default Home
