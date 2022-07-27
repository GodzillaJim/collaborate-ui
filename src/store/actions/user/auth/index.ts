import { AppDispatch } from '../../../index'
import {
  LOGIN_USER_FAIL, LOGIN_USER_REQUEST, LOGIN_USER_SUCCESS,
  REGISTER_USER_FAIL,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS
} from '../../../constants/user/auth'
import { ILoginForm, IRegistrationForm } from '../../../../types'

export const registerUserAction = (form: IRegistrationForm) => async (dispatch: AppDispatch) => {
  try {
    dispatch({ type: REGISTER_USER_REQUEST })
    console.log(form)
    dispatch({ type: REGISTER_USER_SUCCESS })
  } catch (e:any) {
    dispatch({ type: REGISTER_USER_FAIL, payload: e.message || 'Something went wrong! Try again later.' })
  }
}

export const loginAction = (form: ILoginForm) => async (dispatch: AppDispatch) => {
  try {
    dispatch({ type: LOGIN_USER_REQUEST })
    console.log(form)
    dispatch({ type: LOGIN_USER_SUCCESS, payload: { token: 'token', firstName: 'John', avatar: 'https://thispersondoesnotexist.com' } })
  } catch (e:any) {
    dispatch({ type: LOGIN_USER_FAIL, payload: e.message || 'Something went wrong! Try again later' })
  }
}
