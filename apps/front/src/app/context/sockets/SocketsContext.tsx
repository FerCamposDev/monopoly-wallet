import { createContext } from "react";
import { SocketContextTypes } from "./types";

const SocketContext = createContext<SocketContextTypes | null>(null)

export default SocketContext;
