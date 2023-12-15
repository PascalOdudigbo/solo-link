import React from "react";
import { IconContext } from "react-icons/lib";
import Tooltip from "@mui/material/Tooltip";
import { MdCancel } from "react-icons/md";

function EditProjectVideo({ handleCancel, cancelButtonsIconStyle, handleEditProjectVideo, videoTitle, setVideoTitle, videoLink, setVideoLink, isLoading }) {
    return (
        <div className="editProjectVideoFormContainer">
            <div className="editProjectVideoCancelContainer">
                <Tooltip title="Cancel" arrow>
                    <button
                        onClick={() => {
                            handleCancel();
                        }}
                        className="cancelBtn"
                    >
                        <IconContext.Provider value={{ size: "25px" }}>
                            <MdCancel style={cancelButtonsIconStyle} />
                        </IconContext.Provider>
                    </button>
                </Tooltip>
            </div>

            <h2 className="editProjectVideoText p__cormorant">EDIT PROJECT VIDEO</h2>
            <form className={"editProjectVideoForm"} onSubmit={handleEditProjectVideo}>

                <div className="editProjectVideoFormTextAndInputContainer">
                    <p className="editProjectVideoFormText p__opensans">Video title</p>
                    <input className="editProjectVideoFormInput"
                        required
                        type="text"
                        value={videoTitle}
                        onChange={(e) => setVideoTitle(e.target.value)}
                    />
                </div>

                <div className="editProjectVideoFormTextAndInputContainer">
                    <p className="editProjectVideoFormText p__opensans">Video link</p>
                    <input className="editProjectVideoFormInput"
                        required
                        type="text"
                        value={videoLink}
                        onChange={(e) => setVideoLink(e.target.value)}
                    />
                </div>

                <button className="editProjectVideoFormSaveBtn custom__button" type="submit">
                    {isLoading ? <div className="loader"></div> : "Save"}
                </button>
            </form>
        </div>

    );
}
export default EditProjectVideo;