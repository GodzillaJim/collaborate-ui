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
import {
  START_SOCKET_FAIL,
  START_SOCKET_SUCCESS,
} from "../../../../store/constants/chat";
import { SocketContext } from "../../../../context/socket";
import { useDispatch } from "react-redux";

const ChatContainer = () => {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  const [chatUsername, setChatUsername] = useState<string>("");
  const [avatar, setAvatar] = useState<string>("");

  const dispatch = useDispatch();
  const [ioError, setIoError] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [chats, setChats] = useState<any[]>([]);

  const io = useContext(SocketContext);

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
    io.emit("chatMessage", message);
  };

  const connectionHandler = () => {
    setIsConnected(true);
    dispatch({ type: START_SOCKET_SUCCESS, payload: true });
  };

  const connectionErrorHandler = (err: Error) => {
    setIoError(err.message);
    dispatch({ type: START_SOCKET_FAIL, payload: error.message });
  };

  const disconnectHandler = () => {
    setIsConnected(false);
  };

  const newMessageHandler = (data: any) => {
    setChats([...chats, data]);
  };

  React.useEffect(() => {
    io.on("chatMessage", newMessageHandler);
    io.on("connect", connectionHandler);
    io.on("connect_error", connectionErrorHandler);
    io.on("disconnect", disconnectHandler);
    io.connect();
  }, [io, chats]);

  useEffect(() => {
    setIsConnected(io.connected);
  }, [io.active, io.connected]);

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
    const temp = chats as IChatMessage[];
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
        <div className={"d-flex justify-content-between"}>
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
      {(error || ioError) && (
        <div className={"card-body bg-light chat-content"}>
          {error || ioError}
        </div>
      )}
      {loading && (
        <div className={"card-body bg-light chat-content"}>Loading</div>
      )}
      {
        <div className={"card-body bg-light chat-content"}>
          {getMessages().map((mess) =>
            mess.owner ? (
              <div key={`key-${v4()}`} className={"row my-1"}>
                <div className={"col p-0"}>
                  <MessageMe {...mess} />
                </div>
              </div>
            ) : (
              <div key={`key-${v4()}`} className={"row my-1"}>
                <div className={"col p-0"}>
                  <MessageStranger {...mess} />
                </div>
              </div>
            )
          )}
          <div ref={bottomRef}></div>
        </div>
      }
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
