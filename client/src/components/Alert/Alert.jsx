import React from "react";
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { MdError } from 'react-icons/md';


function Alert({ requestStatus, alertMessage, display = "block" }) {
    return (
        <div className="alert_wrapper" style={{ backgroundColor: requestStatus ? "#008631" : "#B71C1C", display: display }}>
            <div className="icon_and_message_wrapper">
                {requestStatus ? <div className="alert_icon"><BsFillCheckCircleFill /></div> : <div className="alertIcon"><MdError /></div>}
                <p className="alert_message p__opensans">{alertMessage}</p>
            </div>
        </div>
    );
}
export default Alert;