import { AppDispatch } from "../../../index";
import {
  LOGIN_USER_FAIL,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  REGISTER_USER_FAIL,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
} from "../../../constants/user/auth";
import { ILoginForm, IRegistrationForm } from "../../../../types";
import axios from "axios";
import { AuthRoutes } from "../../../../types/services/constants/routes/auth";

export const registerUserAction =
  (form: IRegistrationForm) => async (dispatch: AppDispatch) => {
    try {
      dispatch({ type: REGISTER_USER_REQUEST });
      await axios.post(AuthRoutes.REGISTER, form);
      dispatch({ type: REGISTER_USER_SUCCESS });
    } catch (e: any) {
      dispatch({
        type: REGISTER_USER_FAIL,
        payload: e.message || "Something went wrong! Try again later.",
      });
    }
  };

export const loginAction =
  (form: ILoginForm) => async (dispatch: AppDispatch) => {
    try {
      dispatch({ type: LOGIN_USER_REQUEST });
      const {
        data: { firstName, token, avatar },
      } = await axios.post(AuthRoutes.LOGIN, form);
      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: { token, firstName, avatar },
      });
    } catch (e: any) {
      dispatch({
        type: LOGIN_USER_FAIL,
        payload: e.message || "Something went wrong! Try again later",
      });
    }
  };
