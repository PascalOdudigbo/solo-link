import React from "react";
import { IconContext } from "react-icons/lib";
import Tooltip from "@mui/material/Tooltip";
import { MdCancel } from "react-icons/md";
import { BsImageFill } from "react-icons/bs";


function AddProject({ handleCancel, cancelButtonsIconStyle, handleAddProject, projectTitle, setProjectTitle, projectLink, setProjectLink, uploadCoverArtRef, setCoverArt, ButtonsIconStyle, isLoading }) {
    return (
        <div className="addProjectFormContainer">
            <div className="addProjectFormCancelContainer">
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

            <h2 className="addProjectText p__cormorant">ADD PROJECT</h2>
            <form className="addProjectForm" onSubmit={handleAddProject}>
                <div className="addProjectFormTextAndInputContainer">
                    <p className="addProjectFormText p__opensans">Project title</p>
                    <input className="addProjectFormInput"
                        required
                        type="text"
                        value={projectTitle}
                        onChange={(e) => setProjectTitle(e.target.value)}
                    />
                </div>

                <div className="addProjectFormTextAndInputContainer">
                    <p className="addProjectFormText p__opensans">Project link</p>
                    <input className="addProjectFormInput"
                        required
                        type="text"
                        value={projectLink}
                        onChange={(e) => setProjectLink(e.target.value)}
                    />
                </div>

                <div className="addProjectSelectCoverArtContainer">
                    <label className="addProjectFormLabels p__opensans">Select cover art:</label>
                    <input
                        style={{ display: "none" }}
                        ref={uploadCoverArtRef}
                        type="file"
                        accept="image/*"
                        multiple={false}
                        onChange={(e) => setCoverArt(e.target.files[0])}
                    />
                    <Tooltip title="Select cover art" arrow>
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                uploadCoverArtRef.current.click();
                            }}
                            className="addProjectFormSelectCoverArtBtn "
                        >
                            <IconContext.Provider value={{ size: "20px" }}>
                                <BsImageFill style={ButtonsIconStyle} />
                            </IconContext.Provider>
                        </button>
                    </Tooltip>
                </div>

                <button className="addProjectFormSaveBtn custom__button" type="submit">
                    {isLoading ? <div className="loader"></div> : "Save"}
                </button>
            </form>
        </div>
    )
}
export default AddProject