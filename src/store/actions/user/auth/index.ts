import { AppDispatch } from '../../../index'
import {
  REGISTER_USER_FAIL,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS
} from '../../../constants/user/auth'
import { IRegistrationForm } from '../../../../types'

export const registerUserAction = (form: IRegistrationForm) => async (dispatch: AppDispatch) => {
  try {
    dispatch({ type: REGISTER_USER_REQUEST })
    console.log(form)
    dispatch({ type: REGISTER_USER_SUCCESS })
  } catch (e:any) {
    dispatch({ type: REGISTER_USER_FAIL, payload: e.message || 'Something went wrong! Try again later.' })
  }
}
