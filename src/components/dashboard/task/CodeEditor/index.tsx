import React, { useContext, useEffect, useState } from "react";

import { SocketContext } from "../../../../context/socket";
import { Controlled as CodeMirror, ICodeMirror } from "react-codemirror2";
import { useAppSelector } from "../../../../store/hooks";
import { faker } from "@faker-js/faker";
import { v4 } from "uuid";
import { useParams } from "react-router";

import "codemirror/lib/codemirror.css";
import "codemirror/theme/material-darker.css";
import "codemirror/theme/darcula.css";
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/jsx/jsx";
import "codemirror/mode/python/python";
import "codemirror/mode/htmlmixed/htmlmixed";
import "codemirror/addon/lint/lint.css";
import "codemirror/addon/lint/javascript-lint";
import "codemirror/addon/lint/json-lint";
import "codemirror/addon/hint/javascript-hint";
import "codemirror/addon/hint/show-hint.css";
import "codemirror/addon/hint/anyword-hint";

import "codemirror/addon/wrap/hardwrap";
import "codemirror/addon/comment/comment";
import "codemirror/addon/fold/brace-fold";
import "codemirror/addon/fold/indent-fold";
import "codemirror/addon/fold/foldcode";
import "codemirror/addon/fold/foldgutter";
import "codemirror/addon/fold/foldgutter.css";
import "codemirror/addon/fold/comment-fold";

import "codemirror/addon/edit/closetag";
import "codemirror/addon/dialog/dialog.css";
import "codemirror/addon/dialog/dialog";
import "codemirror/addon/mode/simple";
import "codemirror/addon/mode/loadmode";
import "codemirror/addon/mode/multiplex";
import "codemirror/addon/search/search";
import "codemirror/addon/edit/closebrackets";
import "codemirror/keymap/sublime";
import "codemirror/keymap/vim";
import "codemirror/keymap/emacs";

import "./index.scss";
import "./index.css";

import { JSHINT } from "jshint";
import { Socket } from "socket.io-client";
window["JSHINT"] = JSHINT;

const CodeEditor = () => {
  const { error } = useAppSelector((state) => state.socket);
  const io: Socket = useContext(SocketContext);
  const { auth } = useAppSelector((state) => state.auth);
  const [username, setUsername] = useState<string | null>(null);
  const { id } = useParams();
  const modes = {
    javascript: { name: "javascript", typescript: true, jsx: true },
    python: "python",
  };
  const [_users, setUsers] = useState<any[]>([]);
  const [config, setConfig] = useState<ICodeMirror["options"]>({
    mode: modes.javascript,
    theme: "darcula",
    lineNumbers: true,
    gutters: [
      "CodeMirror-lint-markers",
      "CodeMirror-foldgutter",
      "CodeMirror-linenumbers",
    ],
    lineWrapping: true,
    lint: true,
    smartIndent: true,
    foldGutter: true,
    autoCloseTags: true,
    matchBrackets: true,
    autoCloseBrackets: true,
    extraKeys: { "Ctrl-Space": "autocomplete" },
    keyBindings: "vim",
    autoScroll: true,
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
      let temp = editor.children[0];
      if (editor.children.length > 1) {
        editor.children[0].className = "no-height";
        temp = editor.children[1];
      }
      temp.className = temp.className + " h-auto editor-min-height";
    }
  });

  return (
    <div className={"mt-1"} style={{ fontSize: "14px" }}>
      <CodeMirror
        className={"code-editor"}
        autoCursor={false}
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
