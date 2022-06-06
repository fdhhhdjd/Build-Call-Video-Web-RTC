import React from "react";
import { useSelector } from "react-redux";
import { ActiveUsersListItem } from "../../Imports/Index";
import "../../Styles/ActiveUsersList.css";
const ActiveUsersList = () => {
  const { activeUsers } = useSelector((state) => state.user);
  const { callState } = useSelector((state) => state.call);
  return (
    <React.Fragment>
      <div className="active_user_list_container">
        {activeUsers.map((activeUser) => (
          <ActiveUsersListItem
            key={activeUser.socketId}
            activeUser={activeUser}
            callState={callState}
          />
        ))}
      </div>
    </React.Fragment>
  );
};

export default ActiveUsersList;
