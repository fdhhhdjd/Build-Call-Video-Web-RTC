//* LIB
import React from "react";
import { useDispatch } from "react-redux";

//* IMPORT
import logo from "../../assets/logo.png";
import UsernameInput from "./UsernameInput";
import SubmitButton from "./SubmitButton";
import { useNavigate } from "react-router-dom";
import { registerNewUser } from "../../sockets/wssConnection";
import { setUsername } from "../../providers/redux/auth/slice";

const SectionLogin = () => {
  const [input, setInput] = React.useState("");

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleSubmitButtonPressed = () => {
    registerNewUser(input);
    dispatch(setUsername(input));
    navigate("/dashboard");
  };

  return (
    <div className="login-page_container background_main_color">
      <div className="login-page_login_box background_secondary_color">
        <div className="login-page_logo_container">
          <img className="login-page_logo_image" src={logo} alt="VideoTalker" />
        </div>
        <div className="login-page_title_container">
          <h2>VIDEO CHAT</h2>
        </div>
        <UsernameInput username={input} setUsername={setInput} />
        <SubmitButton handleSubmitButtonPressed={handleSubmitButtonPressed} />
      </div>
      <footer>
        {" "}
        <small>&#9400; Copyright 2023, nguyentientail</small>{" "}
      </footer>
    </div>
  );
};

export default SectionLogin;
