//* LIB
import React from "react";

//* IMPORT
import { getLocalStream } from "../../sockets/webRTC/webRTCHandler";
import Footer from "../Footer";
import Logo from "../Logo";
import ActiveUsersList from "./ActiveUsersList";

const SectionDashboard = () => {
  React.useEffect(() => {
    getLocalStream();
  }, []);
  return (
    <div className="dashboard_container background_main_color">
      <div className="dashboard_left_section">
        <div className="dashboard_content_container">
          {/* <DirectCall />
          <GroupCall />
          {callState !== callStates.CALL_IN_PROGRESS && (
            <DashboardInformation username={username} />
          )} */}
        </div>
        <div className="dashboard_rooms_container background_secondary_color">
          {/* <GroupCallRoomsList /> */}
        </div>
      </div>
      <div className="dashboard_right_section background_secondary_color">
        <div className="dashboard_active_users_list">
          <ActiveUsersList />
        </div>
        <Logo />
      </div>
      <Footer />
    </div>
  );
};

export default SectionDashboard;
