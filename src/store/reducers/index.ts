import { submitContactFormReducer } from './contact'
import { AnyAction, Reducer, ReducersMapObject } from '@reduxjs/toolkit'
import { registerUserReducer } from './user/auth'

const reducer: Reducer<any, AnyAction> | ReducersMapObject<any, AnyAction> = {
  health: () => 'App is running',
  submitContactForm: submitContactFormReducer,
  registerUser: registerUserReducer
}
export default reducer
