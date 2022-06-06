import React, { useState } from "react";
import { logo } from "../Imports/images";
import "../Styles/LoginPage.css";
import { useDispatch } from "react-redux";
import { UserNameInput, SubmitButton } from "../Imports/Index";
import { registerNewUser } from "../Utils/Connect-Soket/wssConnection";
import { useNavigate } from "react-router-dom";
import { setUsernameInitiate } from "../Redux/Action/ActionMain";
const LoginPage = () => {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmitButtonPressed = () => {
    registerNewUser(username);
    dispatch(setUsernameInitiate(username));
    navigate("/dashboard");
  };

  return (
    <div className="login-page_container background_main_color">
      <div className="login-page_login_box background_secondary_color">
        <div className="login-page_logo_container">
          <img className="login-page_logo_image" src={logo} alt="VideoTalker" />
        </div>
        <div className="login-page_title_container">
          <h2>VIDEO CHAT.</h2>
        </div>
        <UserNameInput username={username} setUsername={setUsername} />
        <SubmitButton handleSubmitButtonPressed={handleSubmitButtonPressed} />
      </div>
      <footer>
        {" "}
        <small>&#9400; Code Tai Heo Dev Web</small>{" "}
      </footer>
    </div>
  );
};

export default LoginPage;
