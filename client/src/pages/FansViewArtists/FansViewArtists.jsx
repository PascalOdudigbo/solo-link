import React, { useCallback, useEffect, useState } from "react";
import {
    FaTiktok,
    FaInstagram,
    FaFacebook,
    FaTwitter,
    FaYoutube
} from "react-icons/fa";
import {Search, Project} from "../../components";
import { IconContext } from "react-icons/lib";
import axios from "axios";

function FansViewArtists() {
    const [artistData, setArtistData] = useState({});
    const [artistProjects, setArtistProjects] = useState(artistData?.projects);
    const facebookIconStyle = { marginRight: "10px", color: "#4267B2" };
    const instagramIconStyle = { marginRight: "10px", color: "#E1306C" };
    const tiktokIconStyle = { marginRight: "10px", color: "black" };
    const twitterIconStyle = { marginRight: "10px", color: "#1DA1F2" };
    const youtubeIconStyle = { marginRight: "10px", color: "#FF0000" };

    // A function to get the artists data for the fan
    const getArtistData = useCallback(() => {
        let currentLink = window.location.href;
        currentLink = currentLink.split("/");
        let artistID = currentLink[currentLink.length -1]
        
        axios.get(`/artists/${artistID}`)
        .then(res => {
            setArtistData(res.data);
            setAllDataAgain(res.data);
        })
    }, [setAllDataAgain]);
    
    function setAllDataAgain(artistData) {
        setArtistProjects(artistData?.projects);
    }

    useEffect(() => {
        getArtistData();
    }, []);

    function handleSearch(searchData) {
        if (searchData === "") {
          getArtistData();
        } else {
          const filteredProjects = artistProjects?.filter((project) =>
            project?.title.toLowerCase().includes(searchData?.toLowerCase())
          );
          setArtistProjects(filteredProjects);
        }
    }

    return (
        artistData && (
          <div className="artistHomeContainer">
            <div className="artistHomeProfileAndSocialsContainer">
              <div className="artistHomeProfilePicAndName">
                <img
                  className="artistHomeProfilePic"
                  src={
                    artistData?.artists_profile?.artist_image
                      ? artistData?.artists_profile?.artist_image
                      : "https://res.cloudinary.com/dr8mwphvk/image/upload/v1668773802/logo_hm2fxr.png"
                  }
                  alt={artistData.stage_name}
                />
                <h3 className="artistHomeArtistName">{artistData?.stage_name}</h3>
              </div>
    
              <div className="artistHomeBioContainer">
                <p className="artistHomeBio">
                  {artistData?.artists_profile?.bio
                    ? artistData?.artists_profile?.bio
                    : "bio..."}
                </p>
              </div>
    
              <div className="artistHomeSocialsContainer">
                <IconContext.Provider value={{ size: "25px" }}>
                  {artistData?.artists_social?.facebook && (
                    <FaFacebook
                      onClick={() =>
                        (window.location = `${artistData?.artists_social?.facebook}`)
                      }
                      style={facebookIconStyle}
                    />
                  )}
                  {artistData?.artists_social?.instagram && (
                    <FaInstagram
                      onClick={() =>
                        (window.location = `${artistData?.artists_social?.instagram}`)
                      }
                      style={instagramIconStyle}
                    />
                  )}
                  {artistData?.artists_social?.tiktok && (
                    <FaTiktok
                      onClick={() =>
                        (window.location = `${artistData?.artists_social?.tiktok}`)
                      }
                      style={tiktokIconStyle}
                    />
                  )}
                  {artistData?.artists_social?.twitter && (
                    <FaTwitter
                      onClick={() =>
                        (window.location = `${artistData?.artists_social?.twitter}`)
                      }
                      style={twitterIconStyle}
                    />
                  )}
                  {artistData?.artists_social?.youtube && (
                    <FaYoutube
                      onClick={() =>
                        (window.location = `${artistData?.artists_social?.youtube}`)
                      }
                      style={youtubeIconStyle}
                    />
                  )}
                </IconContext.Provider>
              </div>
            </div>
    
            <div className="artistHomeProjectsContainer">
              <Search handleSearch={handleSearch} />
              {/* A Container for all projects */}
              <div className="projectsListContainer">
                {artistProjects?.map((project) => (
                  <Project
                    key={project?.id}
                    title={project?.title}
                    coverArt={project?.cover_art}
                    artistName={artistData?.stage_name}
                    projectUrl={project?.project_url}
                    projectVideos={project?.project_videos}
                  />
                ))}
              </div>
            </div>
          </div>
        )
      );

}

export default FansViewArtists;
