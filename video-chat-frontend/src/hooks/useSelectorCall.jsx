//* LIB
import { useSelector } from "react-redux";

const useSelectorCall = () => {
  const state = useSelector((state) => state.call);
  return state;
};

export default useSelectorCall;
