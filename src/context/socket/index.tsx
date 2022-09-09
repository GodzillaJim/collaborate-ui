import React from "react";
import { io, Socket } from "socket.io-client";
import { config } from "../../config";

export const socket = io({
  host: config.socket.host || "https://api.thejimna.com",
  hostname: config.socket.host || "https://api.thejimna.com",
  port: config.socket.port || 80,
});
export const SocketContext = React.createContext<Socket>(socket);
