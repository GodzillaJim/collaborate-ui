import React, { useContext, useEffect, useMemo } from "react";
import { SocketContext } from "../../../../../context/socket";
import { useParams } from "react-router";
import { useAppSelector } from "../../../../../store/hooks";
import { faker } from "@faker-js/faker";
import { v4 } from "uuid";

const CustomEditor = () => {
  const socket = useContext(SocketContext);
  const { id } = useParams();
  const { auth } = useAppSelector((state) => state.auth);

  const username = useMemo(() => {
    if (auth && auth.firstName) {
      return auth.firstName;
    }
    return faker.internet.userName() + "_" + v4().substring(0, 4);
  }, [auth]);

  useEffect(() => {
    if (socket.disconnected) {
      socket.connect();
    }

    socket.emit("join", { username, id }, (error) => {
      if (error) {
        alert(error);
      }
    });
  }, [id, username]);
};

export default CustomEditor;
