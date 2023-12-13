import React, { useCallback, useEffect, useRef, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import cloudinary from "cloudinary/lib/cloudinary";
import {
  FaTiktok,
  FaInstagram,
  FaFacebook,
  FaTwitter,
  FaYoutube,
  FaUserEdit,
  FaEdit,
  FaVideo,
  FaTrashAlt,
  FaShareAlt,
} from "react-icons/fa";
import { RiLogoutCircleRFill, RiAddCircleFill } from "react-icons/ri";
import { IconContext } from "react-icons/lib";
import Tooltip from "@mui/material/Tooltip";
import { AddProject, AddProjectVideo, EditProject, EditProjectVideo, Search, ShareLinkForm } from "../../components";
import ClipboardJS from "clipboard";


function ArtistHome({ verifyLoginStatus, artistData, setArtistData, hideAlert, setAlertDisplay, setAlertStatus, setAlertMessage }) {
  const url = "https://solo-link.onrender.com";
  const clipboard = new ClipboardJS(".shareLinkFormCopyBtn");

  const navigate = useNavigate("");

  const facebookIconStyle = { marginRight: "10px", color: "#4267B2" };
  const instagramIconStyle = { marginRight: "10px", color: "#E1306C" };
  const tiktokIconStyle = { marginRight: "10px", color: "black" };
  const twitterIconStyle = { marginRight: "10px", color: "#1DA1F2" };
  const youtubeIconStyle = { marginRight: "10px", color: "#FF0000" };
  const ButtonsIconStyle = { color: "white" };
  const addProjectButtonIconStyle = { color: "white", borderRadius: "50%", boxShadow: "rgba(0, 0, 0, .2) 0 3px 5px -1px, rgba(0, 0, 0, .14) 0 6px 10px 0, rgba(0, 0, 0, .12) 0 1px 18px 0" };
  const cancelButtonsIconStyle = { color: "#FF1616" };

  const [addProjectButtonDisplay, setAddProjectButtonDisplay] = useState("block");

  const [projectTitle, setProjectTitle] = useState("");
  const [coverArt, setCoverArt] = useState("");
  const [projectLink, setProjectLink] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const uploadCoverArtRef = useRef(null);
  const [artistProjects, setArtistProjects] = useState(artistData?.projects);
  const [targetProject, setTargetProject] = useState({});
  const [videoTitle, setVideoTitle] = useState("");
  const [videoLink, setVideoLink] = useState("");
  const [targetVideo, setTargetVideo] = useState({});
  const [shareLink, setShareLink] = useState(`${url}/view-artist/${artistData?.stage_name?.toLowerCase()}/${artistData?.id}`);

  // configuring cloudinary
  cloudinary.config({
    cloud_name: process.env.REACT_APP_CLOUD_NAME,
    api_key: process.env.REACT_APP_API_KEY,
    api_secret: process.env.REACT_APP_API_SECRET,
  });

  // A function to set all data again 
  const setAllDataAgain = () => {
    setArtistProjects(artistData?.projects);
    setShareLink(`${url}/view-artist/${artistData?.stage_name?.toLowerCase()}/${artistData?.id}`);
  };

  // A function to handle search
  const handleSearch = (searchData) => {
    if (searchData === "") {
      verifyLoginStatus();
    } else {
      const filteredProjects = artistProjects?.filter((project) =>
        project?.title.toLowerCase().includes(searchData?.toLowerCase())
      );
      setArtistProjects(filteredProjects);
    }
  };

  // A function to handle logout
  const handleLogout = useCallback(async () => {
    try {
      await fetch("/artists_logout", {
        method: "DELETE",
      });
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  }, [navigate]);

  // A function to handle adding a new project
  const handleAddProject = async (e) => {
    e.preventDefault();
    window.scrollTo(0, 0);
    setIsLoading(true);
    const data = new FormData();
    data.append("file", coverArt);
    data.append("upload_preset", process.env.REACT_APP_PRESET_NAME);
    data.append("cloud_name", process.env.REACT_APP_CLOUD_NAME);
    data.append("folder", "Solo-link");
    try {
      const resp = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`,
        data
      );

      const projectData = {
        artist_id: artistData.id,
        title: projectTitle,
        project_url: projectLink,
        cover_art: `${resp.data.url}`,
        cover_art_public_id: `${resp.data.public_id}`,
      };
      axios
        .post(`/projects`, projectData)
        .then((res) => {
          setIsLoading(false);
          setAlertStatus(true);
          setArtistProjects([res.data, ...artistProjects]);
          setAlertDisplay("block");
          setAlertMessage("Project added successfully!");
          hideAlert();
          setAddProjectButtonDisplay("block");
        })
        .catch((error) => {
          setIsLoading(false);
          if (error.response) {
            setAlertStatus(false);
            setAlertDisplay("block");
            setAlertMessage(`${error.response.data.error}`);
            hideAlert();
          }
        });
    } catch (err) {
      setAlertStatus(false);
      setAlertDisplay("block");
      setAlertMessage(`${err}`);
      hideAlert();
    }
  };

  // A function to handle deleting old project image
  const deleteOldProjectImage = async () => {
    cloudinary.v2.uploader
      .destroy(targetProject?.cover_art_public_id, function (error, result) {
      })
      .then((resp) => {

      })
      .catch((err) => {
        setAlertStatus(false);
        setAlertDisplay("block");
        setAlertMessage("Something went wrong, please try again later.");
        hideAlert();
      });
  };

  // A function to handle editting a project
  const handleEditProject = async (e) => {
    e.preventDefault();
    window.scrollTo(0, 0);
    setIsLoading(true);
    const data = new FormData();
    data.append("file", coverArt);
    data.append("upload_preset", process.env.REACT_APP_PRESET_NAME);
    data.append("cloud_name", process.env.REACT_APP_CLOUD_NAME);
    data.append("folder", "Solo-link");
    try {
      const resp = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/image/upload`,
        data
      );
      deleteOldProjectImage();


      const projectData = {
        artist_id: artistData.id,
        title: projectTitle,
        project_url: projectLink,
        cover_art: `${resp.data.url}`,
        cover_art_public_id: `${resp.data.public_id}`,
      };
      axios
        .patch(`/projects/${targetProject.id}`, projectData)
        .then((res) => {
          setIsLoading(false);
          setAlertStatus(true);
          setAlertDisplay("block");
          setAlertMessage("Project edited successfully!");
          hideAlert();
          setAddProjectButtonDisplay("block");
          verifyLoginStatus();
        })
        .catch((error) => {
          setIsLoading(false);
          if (error.response) {
            setAlertStatus(false);
            setAlertDisplay("block");
            setAlertMessage(`${error.response.data.error}`);
            hideAlert();
          }
        });
    } catch (err) {
      setAlertStatus(false);
      setAlertDisplay("block");
      setAlertMessage(`${err}`);
      hideAlert();
    }
  };

  // A function to handle deleting a project
  const handleProjectDelete = (id) => {
    axios.delete(`/projects/${id}`).then(() => {
      window.scrollTo(0, 0);
      setAlertStatus(true);
      setAlertDisplay("block");
      setAlertMessage(`Project deleted successfully!`);
      hideAlert();
    });
    const filteredProjects = artistProjects?.filter(
      (project) => project?.id !== id
    );
    deleteOldProjectImage();
    setArtistProjects(filteredProjects);
  };

  // A function to extract the youtube video ID from a link
  const getYoutubeVideoID = () => {
    const videoLinkArray = videoLink.split("/");
    let videoIdIndex = 0;
    videoLinkArray.forEach((element) => {
      if (element.includes("youtu")) {
        if (videoLinkArray[videoLinkArray.indexOf(element) + 1].includes("embed")) {
          videoIdIndex = videoLinkArray.indexOf(element) + 2
        }
        else {
          videoIdIndex = videoLinkArray.indexOf(element) + 1
        }
      }

    })
    return videoLinkArray[videoIdIndex]
  };

  // A function to handle adding a project video
  const handleAddProjectVideo = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    window.scrollTo(0, 0);
    ;
    let videoUrl = `https://www.youtube.com/embed/${getYoutubeVideoID(videoLink)}`;

    const projectVideoData = {
      project_id: targetProject?.id,
      video_title: videoTitle,
      video_url: videoUrl,
    };

    axios
      .post(`/project_videos`, projectVideoData)
      .then((res) => {
        setIsLoading(false);
        setAlertStatus(true);
        setAlertDisplay("block");
        setAlertMessage("Video added successfully!");
        hideAlert();
        setAddProjectButtonDisplay("block");
        verifyLoginStatus();
      })
      .catch((error) => {
        setIsLoading(false);
        if (error.response) {
          setAlertStatus(false);
          setAlertDisplay("block");
          setAlertMessage(`${error.response.data.error}`);
          hideAlert();
        }
      });
  };

  // A function to handle editting a project video
  const handleEditProjectVideo = async (e) => {
    e.preventDefault();
    window.scrollTo(0, 0);
    setIsLoading(true);

    let videoUrl = `https://www.youtube.com/embed/${getYoutubeVideoID(videoLink)}`;

    const videoData = {
      project_id: targetVideo?.project_id,
      video_title: videoTitle,
      video_url: videoUrl,
    };
    axios
      .patch(`/project_videos/${targetVideo.id}`, videoData)
      .then((res) => {
        setIsLoading(false);
        setAlertStatus(true);
        setAlertDisplay("block");
        setAlertMessage("Video edited successfully!");
        hideAlert();
        setAddProjectButtonDisplay("block");
        verifyLoginStatus();
      })
      .catch((error) => {
        setIsLoading(false);
        if (error.response) {
          setAlertStatus(false);
          setAlertDisplay("block");
          setAlertMessage(`${error.response.data.error}`);
          hideAlert();
        }
      });
  };

  // A function to handle deleting a project video
  const handleProjectVideoDelete = async (id) => {
    axios.delete(`/project_videos/${id}`).then(() => {
      window.scrollTo(0, 0);
      setAlertStatus(true);
      setAlertDisplay("block");
      setAlertMessage(`Video deleted successfully!`);
      hideAlert();
      verifyLoginStatus();
    });
  };

  // A function to hide sub-components being displayed
  const handleCancel = () => {
    navigate("/home");
  };

  // A function to handle copying solo-link to the clipboard
  const handleShareLink = () => {
    setIsLoading(true);
    window.scrollTo(0, 0);
    navigator.clipboard.writeText(shareLink);
    setAlertStatus(true);
    setAlertDisplay("block");
    setAlertMessage(`Link copied!`);
    setIsLoading(false);
    hideAlert();
  };


  useEffect(() => {
    verifyLoginStatus();
  }, []);


  return (
    // Access control to limit access to artists that have logged in
    // artistData?.verified === true && (
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
            <h3 className="artistHomeArtistName p__cormorant">{artistData?.stage_name}</h3>
          </div>

          <div className="artistHomeBioContainer">
            <p className="artistHomeBio p__opensans">
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

          <div className="artistHomeProfileButtonsContainer">
            <Tooltip title="Edit profile" arrow>
              <button
                onClick={() => {
                  navigate("/edit-profile");
                }}
                className="artistHomeEditProfileBtn"
              >
                <IconContext.Provider value={{ size: "20px" }}>
                  <FaUserEdit style={ButtonsIconStyle} />
                </IconContext.Provider>
              </button>
            </Tooltip>

            <Tooltip title="Share your link" arrow>
              <button
                className="artistHomeShare"
                onClick={() => {
                  navigate("/home/share-link")
                }}
              >
                <IconContext.Provider value={{ size: "20px" }}>
                  <FaShareAlt style={ButtonsIconStyle} />
                </IconContext.Provider>
              </button>
            </Tooltip>

            <Tooltip title="Logout" arrow>
              <button
                className="artistHomeLogout"
                onClick={() => {
                  handleLogout();
                }}
              >
                <IconContext.Provider value={{ size: "20px" }}>
                  <RiLogoutCircleRFill style={ButtonsIconStyle} />
                </IconContext.Provider>
              </button>
            </Tooltip>
          </div>
        </div>

        <Routes>
          <Route
            path="/add-project"
            element={
              <div className="artistHomeComponentContainer">
                <AddProject
                  handleCancel={handleCancel}
                  cancelButtonsIconStyle={cancelButtonsIconStyle}
                  handleAddProject={handleAddProject}
                  projectTitle={projectTitle}
                  setProjectTitle={setProjectTitle}
                  projectLink={projectLink}
                  setProjectLink={setProjectLink}
                  uploadCoverArtRef={uploadCoverArtRef}
                  setCoverArt={setCoverArt}
                  ButtonsIconStyle={ButtonsIconStyle}
                  isLoading={isLoading}
                />
              </div>
            }
          />

          <Route
            path="/edit-project"
            element={
              <div className="artistHomeComponentContainer">
                <EditProject
                  handleCancel={handleCancel}
                  cancelButtonsIconStyle={cancelButtonsIconStyle}
                  handleEditProject={handleEditProject}
                  projectTitle={projectTitle}
                  setProjectTitle={setProjectTitle}
                  projectLink={projectLink}
                  setProjectLink={setProjectLink}
                  uploadCoverArtRef={uploadCoverArtRef}
                  setCoverArt={setCoverArt}
                  ButtonsIconStyle={ButtonsIconStyle}
                  isLoading={isLoading}

                />

              </div>
            }
          />

          <Route
            path="/add-project-video"
            element={
              <div className="artistHomeComponentContainer">
                <AddProjectVideo
                  handleCancel={handleCancel}
                  cancelButtonsIconStyle={cancelButtonsIconStyle}
                  handleAddProjectVideo={handleAddProjectVideo}
                  videoTitle={videoTitle}
                  setVideoTitle={setVideoTitle}
                  videoLink={videoLink}
                  setVideoLink={setVideoLink}
                  isLoading={isLoading}
                />
              </div>
            }
          />

          <Route
            path="/edit-project-video"
            element={
              <div className="artistHomeComponentContainer">
                <EditProjectVideo
                  handleCancel={handleCancel}
                  cancelButtonsIconStyle={cancelButtonsIconStyle}
                  handleEditProjectVideo={handleEditProjectVideo}
                  videoTitle={videoTitle}
                  setVideoTitle={setVideoTitle}
                  videoLink={videoLink}
                  setVideoLink={setVideoLink}
                  isLoading={isLoading}
                />
              </div>
            }
          />

          <Route
            path="/share-link"
            element={
              <div className="artistHomeComponentContainer">
                <ShareLinkForm
                  handleCancel={handleCancel}
                  cancelButtonsIconStyle={cancelButtonsIconStyle}
                  handleShareLink={handleShareLink}
                  shareLink={shareLink}
                  isLoading={isLoading}
                />
              </div>
            }
          />
        </Routes>


        <div className="artistHomeProjectsContainer">
          <Search handleSearch={handleSearch} />

          {/* A Container for all projects */}
          <div className="projectsListContainer">
            {/* {artistProjects?.map((project) => (
              <Project
                key={project?.id}
                title={project?.title}
                coverArt={project?.cover_art}
                artistName={artistData?.stage_name}
                projectUrl={project?.project_url}
                projectVideos={project?.project_videos}
                setVideoTitle={setVideoTitle}
                setVideoLink={setVideoLink}
                setTargetVideo={setTargetVideo}
                handleVideoDelete={handleProjectVideoDelete}
                userType={"artist"}
                editButton={
                  <Tooltip title="Edit project" arrow>
                    <button
                      onClick={() => {
                        // navigate("/edit-profile");
                        window.scrollTo(10, 10);
                        setCoverArt(project?.cover_art);
                        setTargetProject(project);
                        setProjectTitle(project?.title);
                        setProjectLink(project?.project_url);
                        navigate("/home/edit-project")
                      }}
                      className="editProjectBtn"
                    >
                      <IconContext.Provider value={{ size: "20px" }}>
                        <FaEdit style={ButtonsIconStyle} />
                      </IconContext.Provider>
                    </button>
                  </Tooltip>
                }
                deleteButton={
                  <Tooltip title="Delete project" arrow>
                    <button
                      onClick={() => {
                        setTargetProject(project);
                        handleProjectDelete(project.id);
                      }}
                      className="deleteProjectBtn"
                    >
                      <IconContext.Provider value={{ size: "20px" }}>
                        <FaTrashAlt style={ButtonsIconStyle} />
                      </IconContext.Provider>
                    </button>
                  </Tooltip>
                }
                addVideoButton={
                  <Tooltip title="Add project video" arrow>
                    <button
                      onClick={() => {
                        // navigate("/edit-profile");
                        window.scrollTo(15, 15);
                        setVideoTitle("");
                        setVideoLink("")
                        setTargetVideo({});
                        setTargetProject(project);
                        navigate("/home/add-project-video");
                      }}
                      className="addProjectVideoBtn"
                    >
                      <IconContext.Provider value={{ size: "20px" }}>
                        <FaVideo style={ButtonsIconStyle} />
                      </IconContext.Provider>
                    </button>
                  </Tooltip>
                }
              />
            ))} */}
          </div>

          <Tooltip title="Add project" arrow>
            <button
              style={{ display: addProjectButtonDisplay }}
              className="artistHomeAddProjectBtn"
            >
              <IconContext.Provider value={{ size: "100px" }}>
                <RiAddCircleFill
                  onClick={() => {
                    window.scrollTo(10, 10);
                    setCoverArt("");
                    setTargetProject({});
                    setProjectTitle("");
                    setProjectLink("");
                    navigate("/home/add-project");
                  }}
                  style={addProjectButtonIconStyle}
                />
              </IconContext.Provider>
            </button>
          </Tooltip>
        </div>
      </div>
    // )
  );
}
export default ArtistHome;
