//* LIB
import React from "react";
import useSelectorAuth from "../../hooks/useSelectorAuth";
import ActiveUsersListItem from "./ListActive/ActiveUsersListItem";

const ActiveUsersList = () => {
  const { activeUsers } = useSelectorAuth();
  return (
    <div className="active_user_list_container">
      {activeUsers?.map((activeUser) => (
        <ActiveUsersListItem
          key={activeUser.socketId}
          activeUser={activeUser}
        />
      ))}
    </div>
  );
};

export default ActiveUsersList;
