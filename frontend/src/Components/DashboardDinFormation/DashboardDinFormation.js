import React from "react";
import "../../Styles/Dashboardinformation.css";
const DashboardDinFormation = (props) => {
  const { username } = props;
  return (
    <React.Fragment>
      <div className="dashboard_info_text_container">
        <span className="dashboard_info_text_title">
          Hello {username} welcome in VideoChat.
        </span>
        <span className="dashboard_info_text_description">
          You can start a call calling directy to a person from the list or you
          can create or join group call.
        </span>
      </div>
    </React.Fragment>
  );
};

export default DashboardDinFormation;
