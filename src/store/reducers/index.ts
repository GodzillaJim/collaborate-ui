import { submitContactFormReducer } from './contact'
import { AnyAction, Reducer, ReducersMapObject } from '@reduxjs/toolkit'

const reducer: Reducer<any, AnyAction> | ReducersMapObject<any, AnyAction> = {
  health: () => 'App is running',
  submitContactForm: submitContactFormReducer
}
export default reducer
