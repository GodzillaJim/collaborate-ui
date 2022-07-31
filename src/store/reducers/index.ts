import { submitContactFormReducer } from './contact'
import { AnyAction, ReducersMapObject } from '@reduxjs/toolkit'
import { authReducer, registerUserReducer } from './user/auth'
import {createTaskReducer, getTaskReducer} from "./tasks";

const reducer:  ReducersMapObject<any, AnyAction> = {
  "health": () => 'App is running',
  submitContactForm: submitContactFormReducer,
  registerUser: registerUserReducer,
  auth: authReducer,
  createTask: createTaskReducer,
  getTask: getTaskReducer
}
export default reducer
