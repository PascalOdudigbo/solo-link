import React from "react";
import { IconContext } from "react-icons/lib";
import Tooltip from "@mui/material/Tooltip";
import { MdCancel } from "react-icons/md";

function AddProjectVideo({ handleCancel, cancelButtonsIconStyle, handleAddProjectVideo, videoTitle, setVideoTitle, videoLink, setVideoLink, isLoading }) {
    return (
        <div className="addProjectVideoFormContainer">
            <div className="addProjectVideoCancelContainer">
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
            <h2 className="addProjectVideoText p__cormorant">ADD PROJECT VIDEO</h2>
            <form className={"addProjectVideoForm"} onSubmit={handleAddProjectVideo}>

                <div className="addProjectVideoFormTextAndInputContainer">
                    <p className="addProjectVideoFormText p__opensans">Video title</p>
                    <input className="addProjectVideoFormInput"
                        required
                        type="text"
                        value={videoTitle}
                        onChange={(e) => setVideoTitle(e.target.value)}
                    />
                </div>

                <div className="addProjectVideoFormTextAndInputContainer">
                    <p className="addProjectVideoFormText p__opensans">Video link</p>
                    <input className="addProjectVideoFormInput"
                        required
                        type="text"
                        value={videoLink}
                        onChange={(e) => setVideoLink(e.target.value)}
                    />
                </div>

                <button className="addProjectVideoFormSaveBtn custom__button" type="submit">
                    {isLoading ? <div className="loader"></div> : "Save"}
                </button>
            </form>
        </div>

    );
}
export default AddProjectVideo;