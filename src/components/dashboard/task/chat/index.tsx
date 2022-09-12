import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { MessageMe, MessageStranger } from "./Message";
import { IMessage } from "../../../../sample/chat";
import { v4 } from "uuid";
import ChatInput, { IChatMessage } from "./ChatInput";
import "./index.css";
import { useAppSelector } from "../../../../store/hooks";
import { getAuthenticatedUser } from "../../../../services/auth";
import { faker } from "@faker-js/faker";
import { SocketContext } from "../../../../context/socket";
import { useParams } from "react-router";
import Loading from "../../../common/Loading";

interface IChatContainer {
  startSocket: () => void;
  chats: IChatMessage[];
  addChat: (message: IChatMessage) => void;
}

const ChatContainer = ({ startSocket, chats, addChat }: IChatContainer) => {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const [chatUsername, setChatUsername] = useState<string>("");
  const [avatar, setAvatar] = useState<string>("");

  const [isConnected, setIsConnected] = useState<boolean>(false);

  const io = useContext(SocketContext);
  const { id } = useParams();
  const { loading, error } = useAppSelector((state) => state.socket);
  const { auth } = useAppSelector((state) => state.auth);

  const getUsername = useCallback(() => {
    const user = getAuthenticatedUser();
    if (user) {
      return { username: user.firstName, avatar: user.avatar };
    }
    const username = faker.internet.userName();
    const tempAvatar = faker.image.avatar();
    return { username, avatar: tempAvatar };
  }, [auth]);

  const sendMessages = (message: IChatMessage) => {
    io.emit("chatMessage", {
      ...message,
      room: id,
    });
  };

  const newMessageHandler = (data: IChatMessage) => {
    addChat(data);
  };

  useEffect(() => {
    io.on("newMessage", newMessageHandler);
    setIsConnected(io.connected);
  }, [id, io.connected]);

  useEffect(() => {
    const { username, avatar: tAvatar } = getUsername();
    setChatUsername(username);
    setAvatar(tAvatar);
  }, [auth]);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [bottomRef.current, chats]);

  const getMessages = (): IMessage[] => {
    const temp = chats || [];
    return temp.map(
      ({ message, avatar: tAvatar, date, sender }: IChatMessage) => ({
        message,
        sender,
        date,
        owner: sender === chatUsername,
        avatar: tAvatar,
      })
    );
  };

  return (
    <div className={"card my-1"}>
      <div className={"card-header"}>
        <div className={"d-flex justify-content-between text-light"}>
          <div>Chat Room</div>
          <div>
            <div className={"row"}>
              <div className={"col"}>{`${chatUsername}: `}</div>
              <div className={"col p-0"}>
                {isConnected ? (
                  <span className={"text-success"}>online</span>
                ) : (
                  <span className={"text-danger"}>offline</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {error && !loading && (
        <div className={"card-body bg-dark chat-content"}>
          <div className={"row my-3"}>
            <div className={"col text-center text-light"}>{error}</div>
          </div>
          <div className={"row"}>
            <div className={"col text-center"}>
              <button className={"btn btn-info btn-sm"} onClick={startSocket}>
                RETRY
              </button>
            </div>
          </div>
        </div>
      )}
      {loading && (
        <div className={"card-body bg-dark text-light chat-content"}>
          <div className={"row"}>
            <div className={"col text-center"}>
              <div>
                <Loading />
              </div>
            </div>
          </div>
        </div>
      )}
      {!error && !loading && (
        <div className={"card-body bg-dark chat-content"}>
          {getMessages().map((mess) =>
            mess.owner ? (
              <div
                key={`key-${v4()}`}
                className={"row my-1"}
                style={{ width: "fit-content" }}
              >
                <div className={"col p-0"}>
                  <MessageMe {...mess} />
                </div>
              </div>
            ) : (
              <div
                key={`key-${v4()}`}
                className={"row my-1 ml-auto"}
                style={{ width: "fit-content" }}
              >
                <div className={"col p-0"}>
                  <MessageStranger {...mess} />
                </div>
              </div>
            )
          )}
          <div ref={bottomRef}></div>
        </div>
      )}
      <div className={"card-footer footer-padding"}>
        <ChatInput
          handleSendMessage={sendMessages}
          username={chatUsername}
          avatar={avatar}
        />
      </div>
    </div>
  );
};
export default ChatContainer;
