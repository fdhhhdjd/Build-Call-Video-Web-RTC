//* LIB
import React from "react";
import { useDispatch } from "react-redux";

//* IMPORT
import { randomIconAvatar } from "../../../common/utils";
import { imageDeFault } from "../../../common/constants";
import { callToOtherUser } from "../../../sockets/webRTC/webRTCHandler";

const ActiveUsersListItem = ({ activeUser }) => {
  const [avatar, setAvatar] = React.useState(imageDeFault);

  const handleListItemPressed = () => {
    callToOtherUser(activeUser);
  };

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await randomIconAvatar();
        setAvatar(result);
      } catch (error) {
        throw new Error(error);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="active_user_list_item" onClick={handleListItemPressed}>
      <div className="active_user_list_image_container">
        <img className="active_user_list_image" src={avatar} alt="user image" />
      </div>
      <span className="active_user_list_text">
        {activeUser.username || "Anonymous"}
      </span>
    </div>
  );
};

export default ActiveUsersListItem;
