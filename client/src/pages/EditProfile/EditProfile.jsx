import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import cloudinary from "cloudinary/lib/cloudinary";
import { useNavigate } from "react-router-dom";
import { FaArrowCircleLeft } from "react-icons/fa";
import Tooltip from "@mui/material/Tooltip";
import { IconContext } from "react-icons/lib";
import { ProfileForm, SocialsForm } from "../../components";


cloudinary.config({
    cloud_name: process.env.REACT_APP_CLOUD_NAME,
    api_key: process.env.REACT_APP_API_KEY,
    api_secret: process.env.REACT_APP_API_SECRET,
});

function EditProfile({ artistData, setArtistData, hideAlert, setAlertDisplay, setAlertStatus, setAlertMessage, fetchArtistData }) {
    const [profilePictureUrl, setProfilePictureUrl] = useState(artistData?.artists_profile?.artist_image);
    const [profilePicture, setProfilePicture] = useState({})
    const [bio, setBio] = useState(artistData?.artists_profile?.bio);
    const [facebookLink, setFacebookLink] = useState(artistData?.artists_social?.facebook);
    const [instagramLink, setInstagramLink] = useState(artistData?.artists_social?.instagram);
    const [tiktokLink, setTiktokLink] = useState(artistData?.artists_social?.tiktok);
    const [twitterLink, setTwitterLink] = useState(artistData?.artists_social?.twitter);
    const [youtubeLink, setYoutubeLink] = useState(artistData?.artists_social?.youtube);

    const ButtonsIconStyle = { color: "white" };
    const uploadButtonRef = useRef(null);
    const navigate = useNavigate();

    // code to delete old profile picture that was uploaded on cloudinary
    const deleteOldImage = async () => {
        try {
            await cloudinary.v2.uploader.destroy(artistData?.artists_profile?.image_public_id);
            setAlertStatus(true);
            setAlertDisplay("block");
            setAlertMessage("Existing photo deleted!");
            hideAlert();
        } catch (error) {
            setAlertStatus(false);
            setAlertDisplay("block");
            setAlertMessage("Something went wrong, please try again later.");
            hideAlert();
        }
    };

    // A function to set all artist data again on page refresh
    const setAllDataAgain = (artistData) => {
        const profile = artistData?.artists_profile;
        setProfilePicture(profile?.artist_image);
        setBio(profile?.bio);
        setFacebookLink(artistData?.artists_social?.facebook);
        setInstagramLink(artistData?.artists_social?.instagram);
        setTiktokLink(artistData?.artists_social?.tiktok);
        setTwitterLink(artistData?.artists_social?.twitter);
        setYoutubeLink(artistData?.artists_social?.youtube);
    };


    // A funtion to handle editting artist profile
    const handleEditProfile = async (setIsLoading) => {
        window.scrollTo(0, 0);
        setIsLoading(true);

        const hasProfile = artistData?.artists_profile !== null;
        const profileData = {
            artist_id: artistData.id,
            artist_image: null,
            image_public_id: null,
            bio: bio,
        };

        if (profilePicture !== undefined && profilePicture !== null) {
            const data = new FormData();
            data.append("file", profilePicture);
            data.append("upload_preset", process.env.REACT_APP_PRESET_NAME);
            data.append("cloud_name", process.env.REACT_APP_CLOUD_NAME);
            data.append("folder", "Solo-link");

            try {
                const resp = await axios.post(
                    `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`,
                    data
                );

                deleteOldImage();
                profileData.artist_image = `${resp.data.url}`;
                profileData.image_public_id = `${resp.data.public_id}`;
            } catch (err) {
                setAlertStatus(false);
                setAlertDisplay("block");
                setAlertMessage(`${err}`);
                hideAlert();
                return;
            }
        }

        try {
            const axiosMethod = hasProfile ? axios.patch : axios.post;
            await axiosMethod(hasProfile ? `artists_profiles/${artistData?.artists_profile?.id}` : `artists_profiles`, profileData);

            setIsLoading(false);
            setAlertStatus(true);
            setAlertDisplay("block");
            setAlertMessage("Profile update successful!");
            hideAlert();
            fetchArtistData(setAllDataAgain);

        } catch (error) {
            setIsLoading(false);
            if (error.response) {
                setAlertStatus(false);
                setAlertDisplay("block");
                setAlertMessage(`${error.response.data.error}`);
                hideAlert();
            }
        }
    };

    // A function to handle editting artist socials
    const handleEditSocials = async (setIsLoading) => {
        window.scrollTo(0, 0);
        setIsLoading(true);
      
        const socialsData = {
          artist_id: artistData?.id,
          instagram: instagramLink,
          twitter: twitterLink,
          tiktok: tiktokLink,
          facebook: facebookLink,
          youtube: youtubeLink,
        };
      
        try {
          const axiosMethod = artistData?.artists_social ? axios.patch : axios.post;
          await axiosMethod(artistData?.artists_social ? `artists_socials/${artistData?.artists_social?.id}` : `artists_socials`, socialsData);
      
          setIsLoading(false);
          setAlertStatus(true);
          setAlertDisplay("block");
          setAlertMessage("Socials update successful!");
          hideAlert();
          fetchArtistData(setAllDataAgain);
        } catch (error) {
          setIsLoading(false);
          if (error.response) {
            setAlertStatus(false);
            setAlertDisplay("block");
            setAlertMessage(`${error.response.data.error}`);
            hideAlert();
          }
        }
      };
      

    useEffect(() => {
        fetchArtistData(setAllDataAgain);
    }, []);

    return (
        artistData?.id ?
            <div className="editProfileAndSocialsContainer">

                <div className="editArtistProfileAndSocialsFormContainer">
                    <div className="profilePicAndBackBtnContainer">
                        <img
                            className="editProfileProfilePic"
                            src={
                                profilePictureUrl ? profilePictureUrl :
                                    artistData?.artists_profile?.artist_image ?
                                        artistData?.artists_profile?.artist_image :
                                        "https://res.cloudinary.com/dr8mwphvk/image/upload/v1668773802/logo_hm2fxr.png"
                            }
                            alt={artistData.stage_name}
                        />

                        <Tooltip title="Back" arrow>
                            <button
                                onClick={() => {
                                    navigate("/home");
                                }}
                                className="editProfileBackBtn"
                            >
                                <IconContext.Provider value={{ size: "20px" }}>
                                    <FaArrowCircleLeft style={ButtonsIconStyle} />
                                </IconContext.Provider>
                            </button>
                        </Tooltip>

                    </div>


                    <ProfileForm
                        handleEditProfile={handleEditProfile}
                        uploadButtonRef={uploadButtonRef}
                        setProfilePicture={setProfilePicture}
                        setProfilePictureUrl={setProfilePictureUrl}
                        ButtonsIconStyle={ButtonsIconStyle}
                        bio={bio}
                        setBio={setBio}
                    />

                    <SocialsForm
                        facebookLink={facebookLink}
                        setFacebookLink={setFacebookLink}
                        instagramLink={instagramLink}
                        setInstagramLink={setInstagramLink}
                        tiktokLink={tiktokLink}
                        setTiktokLink={setTiktokLink}
                        twitterLink={twitterLink}
                        setTwitterLink={setTwitterLink}
                        youtubeLink={youtubeLink}
                        setYoutubeLink={setYoutubeLink}
                        handleEditSocials={handleEditSocials}
                    />

                </div>
            </div> : null

    );
}
export default EditProfile;
