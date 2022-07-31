import React, { useEffect } from "react";
import { useAppDispatch } from "../../../../store/hooks";
import { LOGOUT_USER } from "../../../../store/constants/user/auth";
import { useNavigate, useLocation } from "react-router";
import { signOut } from "../../../../services/auth";

const LogoutScreen = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const state: any = location.state;
    dispatch({ type: LOGOUT_USER });
    signOut();
    if (state && state.redirect) {
      navigate(state.redirect);
    }
    navigate("/");
  });
  return <div></div>;
};

export default LogoutScreen;
