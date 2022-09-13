import { Dispatch } from "@reduxjs/toolkit";

import {
  CREATE_TASK_FAIL,
  CREATE_TASK_REQUEST,
  CREATE_TASK_SUCCESS,
  GET_TASKS_FAIL,
  GET_TASKS_REQUEST,
  GET_TASK_FAIL,
  GET_TASK_REQUEST,
  GET_TASK_SUCCESS,
  GET_TASKS_SUCCESS,
  DELETE_TASK_FAIL,
  DELETE_TASK_REQUEST,
  DELETE_TASK_SUCCESS,
} from "../../constants/task";
import axios from "axios";
import { TaskRoutes } from "../../../types/services/constants/routes/tasks";
import { getToken } from "../../../services/auth";
import { AppDispatch } from "../..";

export const createTaskAction =
  ({ taskName }: { taskName: string }) =>
  async (dispatch: Dispatch) => {
    try {
      dispatch({ type: CREATE_TASK_REQUEST });
      const { data } = await axios.post(
        TaskRoutes.CREATE_TASK,
        { name: taskName },
        { headers: { Authorization: getToken() || "" } }
      );
      dispatch({ type: CREATE_TASK_SUCCESS, payload: data.data });
    } catch (e: any) {
      dispatch({
        type: CREATE_TASK_FAIL,
        payload: (e && e.message) || "Something went wrong!",
      });
    }
  };

export const getTaskAction = (id: string) => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: GET_TASK_REQUEST });
    const { data } = await axios.post(
      TaskRoutes.GET_TASK_BY_ID,
      { id },
      { headers: { Authorization: getToken() || "" } }
    );
    dispatch({ type: GET_TASK_SUCCESS, payload: data.data });
  } catch (e: any) {
    dispatch({
      type: GET_TASK_FAIL,
      payload: (e && e.message) || "Something went wrong!",
    });
  }
};
export const getTasksAction = () => async (dispatch: Dispatch) => {
  try {
    dispatch({ type: GET_TASKS_REQUEST });
    const { data } = await axios.get(TaskRoutes.GET_USER_TASKS, {
      headers: { Authorization: getToken() || "" },
    });
    dispatch({ type: GET_TASKS_SUCCESS, payload: data.data });
  } catch (e: any) {
    dispatch({
      type: GET_TASKS_FAIL,
      payload: (e && e.message) || "Something went wrong!",
    });
  }
};

export const deleteTaskAction =
  (taskId: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch({ type: DELETE_TASK_REQUEST });
      await axios.delete(TaskRoutes.getDeleteTaskPath(taskId), {
        headers: { Authorization: getToken() || "" },
      });
      dispatch({ type: DELETE_TASK_SUCCESS });
      dispatch(getTasksAction());
    } catch (e: any) {
      dispatch({
        type: DELETE_TASK_FAIL,
        payload: e.message || "Something went wrong, try again later.",
      });
    }
  };
