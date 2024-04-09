import { createContext } from "react";
import { SocketContextTypes } from "./types";
import { initialState } from "./state";

const SocketContext = createContext<SocketContextTypes>(initialState)

export default SocketContext;
