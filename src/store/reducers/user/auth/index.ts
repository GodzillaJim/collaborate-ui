import { AnyAction } from '@reduxjs/toolkit'
import {
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
