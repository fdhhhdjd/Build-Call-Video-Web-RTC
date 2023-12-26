//* LIB
import React from "react";
import { CallContext } from "../providers/contexts/CallContext";

//* IMPORT

const useContextCall = () => React.useContext(CallContext);

export default useContextCall;
