//* LIB
import React from "react";

//* IMPORT
import { connectWithWebSocket } from "./sockets/wssConnection/wssConnection";

const App = () => {
  React.useEffect(() => {
    connectWithWebSocket();
  }, []);
  return <React.Fragment></React.Fragment>;
};

export default App;
