import React, { useContext, useEffect, useState } from "react";

import { SocketContext } from "../../../../context/socket";
import { Controlled as CodeMirror } from "react-codemirror2";
import { useAppSelector } from "../../../../store/hooks";
import { faker } from "@faker-js/faker";
import { v4 } from "uuid";
import { useParams } from "react-router";

import "codemirror/lib/codemirror.css";
import "codemirror/theme/material-darker.css";
import "codemirror/mode/javascript/javascript";

import "./index.scss";
import "./index.css";
import { Socket } from "socket.io-client";

const CodeEditor = () => {
  const { error } = useAppSelector((state) => state.socket);
  const io: Socket = useContext(SocketContext);
  const { auth } = useAppSelector((state) => state.auth);
  const [username, setUsername] = useState<string | null>(null);
  const { id } = useParams();

  const [_users, setUsers] = useState<any[]>([]);
  const [config, setConfig] = useState({
    mode: { name: "javascript" },
    theme: "material-darker",
    lineNumbers: true,
  });

  const [text, setText] = useState<string>("");
  const generateUsername = () => {
    if (auth && auth.firstName) {
      return auth.firstName;
    }
    return faker.internet.userName() + "_" + v4().substring(0, 4);
  };

  const handleChange = (value: string) => {
    io.emit("sendText", { room: id, data: value, name: username });
  };

  useEffect(() => {
    if (!username) {
      setUsername(generateUsername());
    }
  }, [id, username]);

  useEffect(() => {
    if (id) {
      io.emit("join", { name: username, room: id }, (err) => {
        if (err) {
          console.log(err);
          alert("Failed to connect room, " + error.message);
        }
      });

      io.on("text", ({ data }) => {
        setText(data);
      });

      io.on("notification", (notification) => {
        console.log(notification);
      });

      io.on("changeMode", (mode) => {
        setConfig({ ...config, mode });
      });

      io.on("changeTheme", (theme) => {
        setConfig({ ...config, theme });
      });

      io.on("roomData", ({ users: u, data }) => {
        setUsers(u);
        setText(data);
      });
    }
  }, [id, auth]);

  useEffect(() => {
    const editors = document.getElementsByClassName("code-editor");
    if (editors.length > 0) {
      const editor = editors[0];
      if (editor.children.length > 1) {
        editor.children[0].className = "no-height";
      }
    }
  });

  return (
    <div>
      <CodeMirror
        className={"code-editor"}
        value={text}
        options={config}
        onBeforeChange={(_editor, _data, value) => {
          setText(value);
          handleChange(value);
        }}
      />
    </div>
  );
};

export default CodeEditor;
