import React from "react";
import { io, Socket } from "socket.io-client";
import { config } from "../../config";

export const socket = io({
  host:
    config.socket.host ||
    "http://dev-env.eba-a2rv6tdz.us-east-1.elasticbeanstalk.com",
  hostname:
    config.socket.host ||
    "http://dev-env.eba-a2rv6tdz.us-east-1.elasticbeanstalk.com",
  port: config.socket.port || 80,
});
export const SocketContext = React.createContext<Socket>(socket);
