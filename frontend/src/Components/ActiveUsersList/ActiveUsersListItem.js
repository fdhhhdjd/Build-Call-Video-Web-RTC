import React from "react";
import { callStates } from "../../Utils/ShareData";
import { Avatar } from "../../Imports/images";
import { callToOtherUser } from "../../Utils/WebRTCHandler/WebRTCHandler";
const ActiveUsersListItem = (props) => {
  const { activeUser, callState } = props;
  const handleListItemPressed = () => {
    if (callState === callStates.CALL_AVAILABLE) {
      callToOtherUser(activeUser);
    }
  };

  return (
    <React.Fragment>
      <div className="active_user_list_item" onClick={handleListItemPressed}>
        <div className="active_user_list_image_container">
          <img
            className="active_user_list_image"
            src={Avatar}
            alt="userimage"
          />
        </div>
        <span className="active_user_list_text">{activeUser.username}</span>
      </div>
    </React.Fragment>
  );
};

export default ActiveUsersListItem;
