import React from "react";
import FacebookLogin from "@greatsumini/react-facebook-login";
import { useAppDispatch } from "../../../../store/hooks";
import { loginAction } from "../../../../store/actions/user/auth";
import { IFacebookProfile } from "../../../../types";

function Facebook() {
  const dispatch = useAppDispatch();
  const handleSuccess = (response: any) => {
    console.log("Response", response);
  };
  const handleError = (response: any) => {
    console.log("Error: ", response);
  };
  const handleProfileSuccess = (response: any) => {
    const res = response as IFacebookProfile;
    console.log("Profile Success", response);
    dispatch(loginAction({ email: res.email, password: res.id }));
  };
  return (
    <div>
      <FacebookLogin
        fields="first_name, last_name, email, picture"
        className="btn btn-block btn-info"
        appId="579040103864510"
        autoLoad
        onProfileSuccess={handleProfileSuccess}
        onFail={handleError}
        onSuccess={handleSuccess}
      />
    </div>
  );
}

export default Facebook;
