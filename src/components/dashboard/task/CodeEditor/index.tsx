import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { useCodeMirror } from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { darcula } from "@uiw/codemirror-theme-darcula";
import { SocketContext } from "../../../../context/socket";
import { useParams } from "react-router";
import { ViewUpdate } from "@codemirror/view";
import { getAuthenticatedUser } from "../../../../services/auth";
import { faker } from "@faker-js/faker";
import { useAppSelector } from "../../../../store/hooks";
import { v4 } from "uuid";
import { isEqual } from "lodash";

const CodeEditor = () => {
  const editor = useRef<HTMLDivElement>(null);
  const [codeText, setCodeText] = useState<string>("");
  const [_username, setUsername] = useState("");
  const [socketId, setSocketID] = useState(v4());

  const { auth } = useAppSelector((state) => state.auth);

  const { id } = useParams();
  const socket = useContext(SocketContext);

  const getUsername = useCallback(() => {
    const user = getAuthenticatedUser();
    if (user) {
      return { username: user.firstName, avatar: user.avatar };
    }
    const username = faker.internet.userName();
    const tempAvatar = faker.image.avatar();
    return { username, avatar: tempAvatar };
  }, [auth]);

  const handleEditorChange = (value: string, viewUpdate: ViewUpdate) => {
    console.log("ViewUpdate: ", viewUpdate);
    socket.emit("clientWrite", {
      clientID: socketId,
      code: value,
      room: id,
      changes: JSON.stringify(viewUpdate.changes.toJSON()),
    });
  };

  const { setContainer } = useCodeMirror({
    extensions: [javascript({ jsx: true, typescript: true })],
    value: codeText,
    theme: darcula,
    height: "500px",
    onChange(value: string, viewUpdate) {
      if (!isEqual(value, codeText)) {
        handleEditorChange(value, viewUpdate);
      }
    },
  });

  useEffect(() => {
    setUsername(getUsername().username);
    if (!socket.connected) {
      socket.connect();
    }
    socket.emit("joinEditorRoom", { room: id, clientID: socketId });
    socket.on("joined", ({ code, socketID }) => {
      console.log("Joined Initial Code", code);
      setSocketID(socketID || v4());
      setCodeText(code);
    });
    socket.on("updates", ({ clientID, code }) => {
      if (clientID !== socketId) {
        setCodeText(code);
      }
    });
  }, [id]);

  useEffect(() => {
    if (editor.current) {
      setContainer(editor.current);
    }
  }, [editor.current]);

  return (
    <div>
      <div ref={editor} />
    </div>
  );
};

export default CodeEditor;
