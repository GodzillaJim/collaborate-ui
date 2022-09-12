import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getTaskAction } from "../../store/actions/tasks";
import CodeEditor from "../../components/dashboard/task/CodeEditor";
import DropdownSelect from "../../components/dashboard/task/CodeEditor/DropdownSelect";
import ChatContainer from "../../components/dashboard/task/chat";
import { SocketContext } from "../../context/socket";
import {
  START_SOCKET_FAIL,
  START_SOCKET_REQUEST,
  START_SOCKET_SUCCESS,
} from "../../store/constants/chat";
import { IChatMessage } from "../../components/dashboard/task/chat/ChatInput";

const TaskScreen = () => {
  const { error, loading, task } = useAppSelector((state) => state.getTask);
  const {
    error: socketError,
    loading: socketLoading,
    socket,
  } = useAppSelector((state) => state.socket);
  const io = useContext(SocketContext);
  const dispatch = useAppDispatch();

  const [showChat, setShowChat] = useState<boolean>(true);
  const [chats, setChats] = useState<IChatMessage[]>([]);
  const { id } = useParams();

  const connectionHandler = () => {
    dispatch({ type: START_SOCKET_SUCCESS, payload: true });
  };

  const connectionErrorHandler = (_err: Error) => {
    io.close();
    dispatch({
      type: START_SOCKET_FAIL,
      payload: "Failed to connect, check connection?",
    });
  };

  const startConnection = () => {
    io.disconnect();
    dispatch({ type: START_SOCKET_REQUEST });
    io.on("connect", connectionHandler);
    io.on("connect_error", connectionErrorHandler);
    io.connect();
  };

  const addChat = (data: IChatMessage) => {
    setChats((prevState) => {
      const isPresent = prevState.find(({ id: chatId }) => chatId === data.id);
      return !isPresent ? [...prevState, { ...data }] : prevState;
    });
  };

  useEffect(() => {
    if (io.disconnected && !socketLoading && !socketError && !socket && task) {
      startConnection();
    }
  }, [id, socketLoading, socketError, io.disconnected, task]);

  useEffect(() => {
    if (!error && !loading && !task) {
      if (id) {
        dispatch(getTaskAction(id));
      }
    }
  }, [error, loading, task]);

  return (
    <div className={"container-fluid py-2"}>
      <div className={"row"}>
        <div className={"col"}>
          {error && <div className={"invalid-feedback d-block"}>{error}</div>}
          {task && (
            <div className={"container-fluid"}>
              <div></div>
              <div className={"row"}>
                <div className={"col"}>
                  <div className={"container-fluid"}>
                    {socketError && (
                      <div className={"row custom-shadow mb-1"}>
                        <div className={"col"}>
                          <span
                            className={"text-danger"}
                            style={{ fontSize: "12px" }}
                          >
                            Failed to initiate a sharing session.
                          </span>
                          <button
                            className={"btn btn-link btn-sm "}
                            disabled={loading}
                            onClick={startConnection}
                            style={{ fontSize: "12px" }}
                          >
                            Retry
                          </button>
                        </div>
                      </div>
                    )}
                    <div className={"row"}>
                      <div className={"col-md-4 col-sm-6 col-xs-6"}>
                        <div className={"text-light my-1"}>{task.name}</div>
                      </div>
                      <div className={"col-md-4 col-sm-6 col-xs-6"}>
                        <DropdownSelect />
                      </div>
                      <div className={"col-auto"}>
                        <button
                          className={"btn btn-text btn-sm text-light"}
                          onClick={() => setShowChat(!showChat)}
                        >
                          {showChat ? "Hide Chat" : "Show Chat"}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={"row"}>
                <div className={"col-md-9 col-lg-10 col-sm-12"}>
                  <CodeEditor />
                </div>
                {showChat && (
                  <div className={"col-md-3 col-lg-2 p-0 col-sm-12"}>
                    <ChatContainer
                      chats={chats}
                      addChat={addChat}
                      startSocket={startConnection}
                    />
                  </div>
                )}
              </div>
            </div>
          )}
          {loading && <div>Loading</div>}
        </div>
      </div>
    </div>
  );
};

export default TaskScreen;
