import React, { useState } from "react"
import { IconContext } from "react-icons/lib";
import Tooltip from "@mui/material/Tooltip";
import { BsImageFill } from "react-icons/bs";

function ProfileForm({handleEditProfile, uploadButtonRef, setProfilePicture, setProfilePictureUrl, ButtonsIconStyle, bio, setBio}){
    const[isLoading, setIsLoading] = useState(false)
    return(
        <form className="editProfileForm" >
                    <h2 className="editProfileText p__cormorant">EDIT PROFILE</h2>
                    <label className="editProfileLabels p__opensans">Select profile image:</label>
                    <input
                        style={{ display: "none" }}
                        type="file"
                        ref={uploadButtonRef}
                        onChange={(e) => {
                            setProfilePicture(e.target.files[0])
                            setProfilePictureUrl(URL.createObjectURL(e.target.files[0]))
                        }}
                        multiple={false}
                        accept="image/*"
                    />

                    <Tooltip title="Select image" arrow>
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                uploadButtonRef.current.click()
                            }}
                            className="editProfileUploadImage"
                        >
                            <IconContext.Provider value={{ size: "20px" }}>
                                <BsImageFill style={ButtonsIconStyle} />
                            </IconContext.Provider>
                        </button>
                    </Tooltip>

                    <div className="editProfileBioContainer">
                            <p className="editProfileBioTitle p__opensans">Bio</p>
                            <textarea className="editProfileBioTextArea" rows="6" cols="75" value={bio} 
                            onChange={(e)=>{
                                if (e.target?.value?.length <= 120){
                                    setBio(e.target.value);
                                }
                            }}/>
                            <p className="editProfileBioMaxInput">{`${bio?.length}/120`}</p>

                        </div>
                    <button className="editProfileSaveButton custom__button" onClick={(e) => { e.preventDefault(); handleEditProfile(setIsLoading);}}>
                        {isLoading ? <div className="loader"></div> : "Save"}
                    </button>
                </form>
    )
}
export default ProfileForm;