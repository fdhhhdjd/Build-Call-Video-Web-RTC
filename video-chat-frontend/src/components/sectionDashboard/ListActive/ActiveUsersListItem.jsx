//* LIB
import React from "react";

//* IMPORT
import { randomIconAvatar } from "../../../common/utils";
import { imageDeFault } from "../../../common/constants";

const ActiveUsersListItem = ({ activeUser }) => {
  const [avatar, setAvatar] = React.useState(imageDeFault);

  const handleListItemPressed = () => {};

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
      <span className="active_user_list_text">{activeUser.username}</span>
    </div>
  );
};

export default ActiveUsersListItem;
