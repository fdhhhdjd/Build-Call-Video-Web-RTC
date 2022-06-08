import React from "react";
import { useSelector } from "react-redux";
import { GroupCallRoomsListItem } from "../../Imports/Index";
import "../../Styles/GroupCallRoomsList.css";
const GroupCallRoomsList = () => {
  const { groupCallRooms } = useSelector((state) => state.user);
  return (
    <React.Fragment>
      {groupCallRooms.map((room) => (
        <GroupCallRoomsListItem key={room.roomId} room={room} />
      ))}
    </React.Fragment>
  );
};

export default GroupCallRoomsList;
