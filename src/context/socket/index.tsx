import React from "react";
import { io, Socket } from "socket.io-client";
import { config } from "../../config";

export const socket = io({
  host: config.socket.host || "localhost",
  hostname: config.socket.host || "localhost",
  port: config.socket.port || 5000,
});
export const SocketContext = React.createContext<Socket>(socket);
