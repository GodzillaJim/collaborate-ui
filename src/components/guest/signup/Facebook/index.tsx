import React from "react";
import FacebookLogin from "@greatsumini/react-facebook-login";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { registerUserAction } from "../../../../store/actions/user/auth";
import { IFacebookProfile, IRegistrationForm } from "../../../../types";

function Facebook() {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector((state) => state.auth);
  const handleSuccess = (response: any) => {
    console.log("Response", response);
  };
  const handleError = (response: any) => {
    console.log("Error: ", response);
  };
  const handleProfileSuccess = (response: any) => {
    const res = response as IFacebookProfile;
    console.log("Profile Success", response);
    const form: IRegistrationForm = {
      email: res.email,
      firstName: res.first_name,
      lastName: res.last_name,
      password: res.id,
      confirmPassword: res.id,
      avatar: res.picture.data.url,
    };
    dispatch(registerUserAction(form));
  };
  return (
    <div>
      <FacebookLogin
        fields="first_name, last_name, email, picture"
        className={"btn btn-block btn-info" + loading ? " disabled" : ""}
        appId="579040103864510"
        autoLoad
        onProfileSuccess={handleProfileSuccess}
        onFail={handleError}
        onSuccess={handleSuccess}
      >
        Sign Up with Facebook
      </FacebookLogin>
    </div>
  );
}

export default Facebook;
