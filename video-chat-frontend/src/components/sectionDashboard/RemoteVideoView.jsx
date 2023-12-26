import React from "react";
import useSelectorCall from "../../hooks/useSelectorCall";

const styles = {
  videoContainer: {
    width: "100%",
    height: "100%",
  },
  videoElement: {
    width: "100%",
    height: "100%",
  },
};

const LocalVideoView = () => {
  const { remoteStream } = useSelectorCall();

  const remoteVideoRef = React.useRef();

  React.useEffect(() => {
    if (remoteStream) {
      const remoteVideo = remoteVideoRef.current;
      remoteVideo.srcObject = remoteStream;

      remoteVideo.onloadedmetadata = () => {
        remoteVideo.play();
      };
    }
  }, [remoteStream]);

  return (
    <div style={styles.videoContainer}>
      <video style={styles.videoElement} ref={remoteVideoRef} autoPlay />
    </div>
  );
};

export default LocalVideoView;
