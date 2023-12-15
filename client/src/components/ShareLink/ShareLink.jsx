import React from "react";
import { IconContext } from "react-icons/lib";
import Tooltip from "@mui/material/Tooltip";
import { MdCancel } from "react-icons/md";

function ShareLink({ handleCancel, cancelButtonsIconStyle, handleShareLink, shareLink, isLoading }) {
  return (
    <div className="shareLinkFormContainer">
      <div className="shareLinkCancelContainer">
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

      <form className={"shareLinkForm"} onSubmit={handleShareLink}>
        <input className="shareLinkFormInput" type="text" value={shareLink} readOnly />
        <button className="shareLinkFormCopyBtn custom__button" data-clipboard-text={shareLink} type="submit">
          {isLoading ? <div className="loader"></div> : "Copy"}
        </button>
      </form>
    </div>

  );
}
export default ShareLink;