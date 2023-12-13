import { Tooltip } from "@mui/material";
import React from "react";
import { useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import {IoMdArrowDropdownCircle, IoMdArrowDroprightCircle} from "react-icons/io";

import { IconContext } from "react-icons/lib";
import { useNavigate } from "react-router-dom";
import {ProjectVideo} from "../../components";

function Project({
  ProjectId,
  title,
  coverArt,
  artistName,
  projectUrl,
  editButton,
  deleteButton,
  addVideoButton,
  projectVideos,
  setVideoTitle,
  setVideoLink,
  setTargetVideo,
  handleVideoDelete,
  userType
}) {
  const ButtonsIconStyle = { color: "white" };
  const ShowOrHideButtonsIconStyle = {color: "black"};
  const [projectVideosListDisplay, setProjectVideosListDisplay] = useState("none");
  const navigate = useNavigate();

  return (
    <div className="projectContainer">
      <img className="coverArt" src={coverArt} alt={`${title}'s cover art`} />
      <h3 className="projectTitle p__cormorant">{title}</h3>
      <h4 className="artistName p__cormorant">{artistName}</h4>
      <a className={"projectLink custom__button"} href={projectUrl}>Stream</a>
      <div className="projectButtonsContainer">
        {editButton}
        {addVideoButton}
        {deleteButton}
      </div>
      {projectVideos?.length > 0 && <Tooltip
        title={
          projectVideosListDisplay === "none" ? "Show videos" : "Hide videos"
        }
        arrow
      >
        <button
          onClick={() => {
            if (projectVideosListDisplay === "block") {
              setProjectVideosListDisplay("none");
            } else if (projectVideosListDisplay === "none") {
              setProjectVideosListDisplay("block");
            }
          }}
          className="showOrHideVideosBtn custom__button"
        >
          <IconContext.Provider value={{ size: "30px" }}>
            {projectVideosListDisplay === "block" ? (
              <IoMdArrowDropdownCircle style={ShowOrHideButtonsIconStyle} />
            ) : (
              <IoMdArrowDroprightCircle style={ShowOrHideButtonsIconStyle} />
            )}
          </IconContext.Provider>
        </button>
      </Tooltip>}
      <div className="projectVideosList" id={`${ProjectId}`} style={{display: projectVideosListDisplay}}>
        {projectVideos?.map((video) => (
          <ProjectVideo
            key={video?.id}
            videoId={video?.id}
            videoTitle={video?.video_title}
            VideoUrl={video?.video_url}
            editButton={
              userType=== "artist" && <Tooltip title="Edit video" arrow>
                <button
                  onClick={() => {
                    window.scrollTo(10, 10);
                    setVideoTitle(video?.video_title);
                    setVideoLink(video?.video_url)
                    setTargetVideo(video);
                    navigate("/home/edit-project-video")
                  }}
                  className="editVideoBtn custom__button"
                >
                  <IconContext.Provider value={{ size: "20px" }}>
                    <FaEdit style={ButtonsIconStyle} />
                  </IconContext.Provider>
                </button>
              </Tooltip>
            }
            deleteButton={
              userType === "artist" && <Tooltip title="Delete video" arrow>
                <button
                  onClick={() => {
                    handleVideoDelete(video?.id);
                  }}
                  className="deleteVideoBtn custom__button"
                >
                  <IconContext.Provider value={{ size: "20px" }}>
                    <FaTrashAlt style={ButtonsIconStyle} />
                  </IconContext.Provider>
                </button>
              </Tooltip>
            }
          />
        ))}
      </div>
    </div>
  );
}
export default Project;
