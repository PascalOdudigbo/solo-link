import React from "react";
import { IconContext } from "react-icons/lib";
import Tooltip from "@mui/material/Tooltip";
import { MdCancel } from "react-icons/md";
import { BsImageFill } from "react-icons/bs";


function EditProject({ handleCancel, cancelButtonsIconStyle, handleEditProject, projectTitle, setProjectTitle, projectLink, setProjectLink, uploadCoverArtRef, setCoverArt, ButtonsIconStyle, isLoading }) {
    return (
        <div className="editProjectFormContainer">
            <div className="editProjectFormCancelContainer">
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


            <h2 className="editProjectText p__cormorant">EDIT PROJECT</h2>
            <form className="editProjectForm" onSubmit={handleEditProject}>
                <div className="editProjectFormTextAndInputContainer">
                    <p className="editProjectFormText p__opensans">Project title</p>
                    <input className="editProjectFormInput"
                        required
                        type="text"
                        value={projectTitle}
                        onChange={(e) => setProjectTitle(e.target.value)}
                    />
                </div>

                <div className="editProjectFormTextAndInputContainer">
                    <p className="editProjectFormText p__opensans">Project link</p>
                    <input className="editProjectFormInput"
                        required
                        type="text"
                        value={projectLink}
                        onChange={(e) => setProjectLink(e.target.value)}
                    />
                </div>

                <div className="editProjectSelectCoverArtContainer">
                    <label className="editProjectFormLabels p__opensans">Select cover art:</label>
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
                            className="editProjectFormSelectCoverArtBtn"
                        >
                            <IconContext.Provider value={{ size: "20px" }}>
                                <BsImageFill style={ButtonsIconStyle} />
                            </IconContext.Provider>
                        </button>
                    </Tooltip>
                </div>

                <button className="editProjectFormSaveBtn custom__button" type="submit">
                    {isLoading ? <div className="loader"></div> : "Save"}
                </button>
            </form>
        </div>
    )
}
export default EditProject