//* LIB
import { useSelector } from "react-redux";

const useSelectorAuth = () => {
  const state = useSelector((state) => state.auth);
  return state;
};

export default useSelectorAuth;
