//* LIB
import React from "react";

//* IMPORT
import useSelectorCall from "../../hooks/useSelectorCall";

const styles = {
  videoContainer: {
    width: "150px",
    height: "150px",
    borderRadius: "8px",
    position: "absolute",
    top: "5%",
    right: "23%",
  },
  videoElement: {
    width: "100%",
    height: "100%",
  },
};
const LocalVideoView = () => {
  const { localStream } = useSelectorCall();
  const localVideoRef = React.useRef();

  React.useEffect(() => {
    if (localStream) {
      const localVideo = localVideoRef.current;
      localVideo.srcObject = localStream;

      localVideo.onloadedmetadata = () => {
        localVideo.play();
      };
    }
  }, [localStream]);

  return (
    <div style={styles.videoContainer} className="background_secondary_color">
      <video style={styles.videoElement} ref={localVideoRef} autoPlay muted />
    </div>
  );
};

export default LocalVideoView;
