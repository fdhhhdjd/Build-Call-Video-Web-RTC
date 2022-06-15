import React, { useState, useEffect } from "react";
import { sendMessageUsingDataChannel } from "../../Utils/WebRTCHandler/WebRTCHandler";
import { MessageDisplayer } from "../../Imports/Index";
import "../../Styles/Messenger.css";
import { setMessageInitiate } from "../../Redux/Action/ActionCall";

const Messenger = ({ message, setDirectCallMessage }) => {
  const [inputValue, setInputValue] = useState("");

  const handleOnKeyDownEvent = (e) => {
    if (e.keyCode === 13) {
      sendMessageUsingDataChannel(inputValue);
      setInputValue("");
    }
  };

  useEffect(() => {
    if (message.messageReceived) {
      setTimeout(() => {
        setMessageInitiate({
          messageReceived: false,
          messageContent: "",
        });
      }, [6000]);
    }
    // eslint-disable-next-line
  }, [message.messageReceived]);
  return (
    <>
      <input
        className="messages_input"
        type="text"
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
        onKeyDown={handleOnKeyDownEvent}
        placeholder="Type your message"
      />
      {message.messageReceived && (
        <MessageDisplayer message={message.messageContent} />
      )}
    </>
  );
};

export default Messenger;
