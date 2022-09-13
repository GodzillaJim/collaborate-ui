import { submitContactFormReducer } from "./contact";
import { AnyAction, ReducersMapObject } from "@reduxjs/toolkit";
import { authReducer, registerUserReducer } from "./user/auth";
import {createTaskReducer, getTaskReducer, getTasksReducer} from "./tasks";
import { chatMessagesReducer, sendMessageReducer, socketReducer } from "./chat";

const reducer: ReducersMapObject<any, AnyAction> = {
  health: () => "App is running",
  submitContactForm: submitContactFormReducer,
  registerUser: registerUserReducer,
  auth: authReducer,
  createTask: createTaskReducer,
  getTask: getTaskReducer,
  sendMessage: sendMessageReducer,
  socket: socketReducer,
  chatMessages: chatMessagesReducer,
  getTasks: getTasksReducer
};
export default reducer;
