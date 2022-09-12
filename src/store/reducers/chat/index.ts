import { AnyAction } from "@reduxjs/toolkit";
import {
  RECEIVE_MESSAGE_FAIL,
  RECEIVE_MESSAGE_REQUEST,
  RECEIVE_MESSAGE_SUCCESS,
  SEND_MESSAGE_FAIL,
  SEND_MESSAGE_REQUEST,
  SEND_MESSAGE_SUCCESS,
  START_SOCKET_FAIL,
  START_SOCKET_REQUEST,
  START_SOCKET_SUCCESS,
} from "../../constants/chat";

interface IState {
  loading: boolean;
  error: string | null;
  success: boolean | null;
}

const defaultState: IState = {
  loading: false,
  error: null,
  success: null,
};

export const sendMessageReducer = (
  state: IState = defaultState,
  action: AnyAction
) => {
  switch (action.type) {
    case SEND_MESSAGE_REQUEST:
      return { loading: true, error: null, success: null };
    case SEND_MESSAGE_SUCCESS:
      return { loading: false, error: null, success: true };
    case SEND_MESSAGE_FAIL:
      return { loading: false, error: action.payload, success: false };
    default:
      return state;
  }
};

export const socketReducer = (
  state: { loading: boolean; error: null | string; socket: any } = {
    loading: false,
    error: null,
    socket: null,
  },
  action: AnyAction
) => {
  switch (action.type) {
    case START_SOCKET_REQUEST:
      return { loading: true, error: null, socket: null };
    case START_SOCKET_SUCCESS:
      return { loading: false, error: null, socket: action.payload };
    case START_SOCKET_FAIL:
      return { loading: false, error: action.payload, socket: false };
    default:
      return state;
  }
};

export const chatMessagesReducer = (
  state: {
    messages: any[] | null;
    loading: boolean;
    error: string | null;
  } = { messages: [], loading: false, error: null },
  action: AnyAction
) => {
  switch (action.type) {
    case RECEIVE_MESSAGE_REQUEST:
      return { messages: state.messages, loading: true, error: null };
    case RECEIVE_MESSAGE_SUCCESS:
      return { messages: action.payload, loading: false, error: null };
    case RECEIVE_MESSAGE_FAIL:
      return { messages: null, error: action.payload, loading: false };
    default:
      return state;
  }
};
