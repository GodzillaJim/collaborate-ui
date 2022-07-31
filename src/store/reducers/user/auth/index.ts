import { AnyAction } from '@reduxjs/toolkit'
import {
  LOGIN_USER_FAIL,
  LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS, LOGOUT_USER,
  REGISTER_USER_FAIL,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS
} from '../../../constants/user/auth'

export const registerUserReducer = (
  state: { loading: boolean, error: string | null, success: boolean } =
  { loading: false, error: null, success: false }, action: AnyAction) => {
  switch (action.type) {
    case REGISTER_USER_REQUEST:
      return { loading: true, error: null, success: false }
    case REGISTER_USER_SUCCESS:
      return { loading: false, error: null, success: true }
    case REGISTER_USER_FAIL:
      return { loading: false, error: action.payload, success: false }
    default:
      return state
  }
}

export const authReducer = (
  state: { loading: boolean, error: string | null, auth: { token: string, firstName: string, avatar: string } | null } =
  { loading: false, error: null, auth: null }, action: AnyAction
) => {
  switch (action.type) {
    case LOGIN_USER_REQUEST:
      return { loading: true, error: null, auth: null }
    case LOGIN_USER_SUCCESS:
      return { loading: false, error: null, auth: action.payload }
    case LOGIN_USER_FAIL:
      return { loading: false, error: action.payload, auth: null }
    case LOGOUT_USER:
      return { loading: false, error: null, auth: null }
    default:
      return state
  }
}
