//* LIB
import React from "react";

//* IMPORT
import { getLocalStream } from "../../sockets/webRTC/webRTCHandler";

const SectionDashboard = () => {
  React.useEffect(() => {
    getLocalStream();
  }, []);
  return <>SectionDashboard</>;
};

export default SectionDashboard;
