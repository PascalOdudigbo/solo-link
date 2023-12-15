import React, { useState } from "react"


function SocialsForm({ facebookLink, setFacebookLink, instagramLink, setInstagramLink, tiktokLink, setTiktokLink, twitterLink, setTwitterLink, youtubeLink, setYoutubeLink, handleEditSocials }) {
    const [isLoading, setIsLoading] = useState(false)
    return (
        <form className="editSocialsForm" onSubmit={(e) => { e.preventDefault(); handleEditSocials(setIsLoading); }}>
            <h2 className="editSocialsText p__cormorant">EDIT SOCIALS</h2>

            <div className="editSocialsFormTextAndInputContainer">
                <p className="editSocialsFormText p__opensans">Facebook link</p>
                <input className="editSocialsFormInput"
                    type="text"
                    value={facebookLink}
                    onChange={(e) => setFacebookLink(e.target.value)}
                />
            </div>

            <div className="editSocialsFormTextAndInputContainer">
                <p className="editSocialsFormText p__opensans">Instagram link</p>
                <input className="editSocialsFormInput"
                    type="text"
                    value={instagramLink}
                    onChange={(e) => setInstagramLink(e.target.value)}
                />
            </div>

            <div className="editSocialsFormTextAndInputContainer">
                <p className="editSocialsFormText p__opensans">TikTok link</p>
                <input className="editSocialsFormInput"
                    type="text"
                    value={tiktokLink}
                    onChange={(e) => setTiktokLink(e.target.value)}
                />
            </div>

            <div className="editSocialsFormTextAndInputContainer">
                <p className="editSocialsFormText p__opensans">Twitter link</p>
                <input className="editSocialsFormInput"
                    type="text"
                    value={twitterLink}
                    onChange={(e) => setTwitterLink(e.target.value)}
                />
            </div>

            <div className="editSocialsFormTextAndInputContainer">
                <p className="editSocialsFormText p__opensans">Youtube link</p>
                <input className="editSocialsFormInput"
                    type="text"
                    value={youtubeLink}
                    onChange={(e) => setYoutubeLink(e.target.value)}
                />
            </div>

            <button className="editProfileSaveButton custom__button">
                {isLoading ? <div className="loader"></div> : "Save"}
            </button>
        </form>
    )
}

export default SocialsForm;