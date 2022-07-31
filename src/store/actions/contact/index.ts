import { Dispatch } from "@reduxjs/toolkit";
import { IContactForm } from "../../../types";
import {
  SUBMIT_CONTACT_FORM_FAIL,
  SUBMIT_CONTACT_FORM_REQUEST,
  SUBMIT_CONTACT_FORM_SUCCESS,
} from "../../constants/contact";

export const submitContactFormAction =
  (form: IContactForm) => async (dispatch: Dispatch) => {
    try {
      dispatch({ type: SUBMIT_CONTACT_FORM_REQUEST });
      console.log("Form", form);
      dispatch({ type: SUBMIT_CONTACT_FORM_SUCCESS });
    } catch (e: any) {
      dispatch({
        type: SUBMIT_CONTACT_FORM_FAIL,
        payload: (e && e.message) || "Something went wrong!",
      });
    }
  };
