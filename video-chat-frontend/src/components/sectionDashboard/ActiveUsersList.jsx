//* LIB
import React from "react";
import useSelectorAuth from "../../hooks/useSelectorAuth";
import ActiveUsersListItem from "./ListActive/ActiveUsersListItem";
import useSelectorCall from "../../hooks/useSelectorCall";

const ActiveUsersList = () => {
  const { activeUsers } = useSelectorAuth();
  const { callState } = useSelectorCall();
  return (
    <div className="active_user_list_container">
      {activeUsers?.map((activeUser) => (
        <ActiveUsersListItem
          key={activeUser.socketId}
          activeUser={activeUser}
          callState={callState}
        />
      ))}
    </div>
  );
};

export default ActiveUsersList;
