import React from "react";
import { io, Socket } from "socket.io-client";

export const socket = io(
  "http://dev-env.eba-a2rv6tdz.us-east-1.elasticbeanstalk.com"
);
export const SocketContext = React.createContext<Socket>(socket);
