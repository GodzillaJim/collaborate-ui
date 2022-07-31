import { AnyAction } from "@reduxjs/toolkit";
import {
  SUBMIT_CONTACT_FORM_FAIL,
  SUBMIT_CONTACT_FORM_REQUEST,
  SUBMIT_CONTACT_FORM_SUCCESS,
} from "../../constants/contact";

export const submitContactFormReducer = (
  state: any = { loading: false, error: null, success: null },
  action: AnyAction
) => {
  switch (action.type) {
    case SUBMIT_CONTACT_FORM_REQUEST:
      return { loading: true, error: null, success: null };
    case SUBMIT_CONTACT_FORM_SUCCESS:
      return { loading: false, error: null, success: true };
    case SUBMIT_CONTACT_FORM_FAIL:
      return { loading: false, error: action.payload, success: false };
    default:
      return state;
  }
};
