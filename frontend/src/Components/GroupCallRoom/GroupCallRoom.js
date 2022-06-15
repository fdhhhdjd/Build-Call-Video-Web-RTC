import React from "react";
import { useSelector } from "react-redux";
import { ConversationButtons, GroupCallVideo } from "../../Imports/Index";
const GroupCallRoom = () => {
  const { groupCallStreams } = useSelector((state) => state.call);
  console.log(groupCallStreams, "-----aloo-----");
  return (
    <React.Fragment>
      <div className="group_call_room_container">
        <span className="group_call_title">Group Call</span>
        <div className="group_call_videos_container">
          {groupCallStreams.map((stream) => {
            return <GroupCallVideo key={stream.id} stream={stream} />;
          })}
        </div>
        <ConversationButtons />
      </div>
    </React.Fragment>
  );
};

export default GroupCallRoom;
