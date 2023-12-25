//* LIB
import React from "react";

const DashboardInformation = ({ username }) => {
  return (
    <div className="dashboard_info_text_container">
      <span className="dashboard_info_text_title">
        Hello {username} welcome in VideoChat.
      </span>
      <span className="dashboard_info_text_description">
        You can start a call calling direct to a person from the list or you can
        create or join group call.
      </span>
    </div>
  );
};

export default DashboardInformation;
