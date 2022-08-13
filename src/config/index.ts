export const config = {
  socket: {
    host: process.env.REACT_APP_SOCKET_HOST || "localhost",
    port: process.env.REACT_APP_SOCKET_PORT || 5000,
  },
};
