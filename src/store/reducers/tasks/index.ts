import { AnyAction } from "@reduxjs/toolkit";
import { ITask } from "../../../types";
import {
  CREATE_TASK_FAIL,
  CREATE_TASK_REQUEST,
  CREATE_TASK_RESET,
  CREATE_TASK_SUCCESS,
  GET_TASK_FAIL,
  GET_TASK_REQUEST,
  GET_TASK_SUCCESS,
  GET_TASKS_FAIL,
  GET_TASKS_REQUEST,
  GET_TASKS_SUCCESS,
  DELETE_TASK_FAIL,
  DELETE_TASK_REQUEST,
  DELETE_TASK_SUCCESS,
} from "../../constants/task";

export const createTaskReducer = (
  state: { loading: boolean; error: any; task: ITask | null } = {
    loading: false,
    error: null,
    task: null,
  },
  action: AnyAction
) => {
  switch (action.type) {
    case CREATE_TASK_REQUEST:
      return { loading: true, error: null, task: null };
    case CREATE_TASK_SUCCESS:
      return { loading: false, error: null, task: action.payload };
    case CREATE_TASK_FAIL:
      return { loading: false, error: action.payload, task: null };
    case CREATE_TASK_RESET:
      return { loading: false, error: null, task: null };
    default:
      return state;
  }
};

export const getTaskReducer = (
  state: { loading: boolean; error: any; task: ITask | null } = {
    loading: false,
    error: null,
    task: null,
  },
  action: AnyAction
) => {
  switch (action.type) {
    case GET_TASK_REQUEST:
      return { loading: true, error: null, task: null };
    case GET_TASK_SUCCESS:
      return { loading: false, error: null, task: action.payload };
    case GET_TASK_FAIL:
      return { loading: false, error: action.payload, task: null };
    default:
      return state;
  }
};

export const getTasksReducer = (
  state: { loading: boolean; error: any; tasks: ITask[] | null } = {
    loading: false,
    error: null,
    tasks: null,
  },
  action: AnyAction
) => {
  switch (action.type) {
    case GET_TASKS_REQUEST:
      return { loading: true, error: null, tasks: null };
    case GET_TASKS_SUCCESS:
      return { loading: false, error: null, tasks: action.payload };
    case GET_TASKS_FAIL:
      return { loading: false, error: action.payload, tasks: null };
    default:
      return state;
  }
};

export const deleteTaskReducer = (
  state: { loading: boolean; error: any; success: boolean } = {
    loading: false,
    error: null,
    success: false,
  },
  action: AnyAction
) => {
  switch (action.type) {
    case DELETE_TASK_REQUEST:
      return { loading: true, error: null, success: false };
    case DELETE_TASK_SUCCESS:
      return { loading: false, error: null, success: true };
    case DELETE_TASK_FAIL:
      return { loading: false, error: action.payload, success: false };
    default:
      return state;
  }
};
