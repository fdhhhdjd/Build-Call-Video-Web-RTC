//* LIB
import React from "react";
import { useDispatch } from "react-redux";

//* IMPORT
import { useNavigate } from "react-router-dom";
import { setUsername } from "../../providers/redux/auth/slice";
import { registerNewUser } from "../../sockets/wssConnection/wssConnection";
import Footer from "../Footer";
import Logo from "../Logo";
import SubmitButton from "./SubmitButton";
import UsernameInput from "./UsernameInput";

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
        <Logo />
        <div className="login-page_title_container">
          <h2>VIDEO CHAT</h2>
        </div>
        <UsernameInput username={input} setUsername={setInput} />
        <SubmitButton handleSubmitButtonPressed={handleSubmitButtonPressed} />
      </div>
      <Footer />
    </div>
  );
};

export default SectionLogin;
