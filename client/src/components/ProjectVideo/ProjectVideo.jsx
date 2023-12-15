import React from "react";

function ProjectVideo({videoId, videoTitle, VideoUrl, editButton, deleteButton}){
    return (
        <div className="projectVideoContainer">
            <h3 className="VideoTitle p__cormorant">{videoTitle}</h3>
                <iframe className="projectVideo" title={videoId} src={VideoUrl} allow="accelerometer; encrypted-media; gyroscope; picture-in-picture" allowFullScreen/>
            <div className="projectVideoButtonContainer">
                {editButton}
                {deleteButton}
            </div>
        </div>
    );

}
export default ProjectVideo;