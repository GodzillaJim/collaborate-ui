import React from "react";
import { useNavigate } from "react-router";
import Collaborate from "../../components/icons/collaborate.png";

const HomeScreen = () => {
  const navigate = useNavigate();
  return (
    <div className={"container m-2 h-100"}>
      <div className={"row h-100"}>
        <div className={"col my-auto text-center"}>
          <div>
            <img
              className={"img-fluid"}
              height={"auto"}
              width={301}
              alt={"collaborate"}
              src={Collaborate}
            />
          </div>
        </div>
        <div className={"col my-auto text-center"}>
          <div className={"text-light text-left"}>
            <h4 className={"card-header h4"}>
              A simple collaborative app for peer programming in three simple
              steps:
            </h4>
            <li className={"list-group"}>
              <ol className={"list-group-item"}>Sign up</ol>
              <ol className={"list-group-item"}>Create a task</ol>
              <ol className={"list-group-item"}>
                Copy and share task link with a peer
              </ol>
              <ol className={"list-group-item"}>Write code</ol>
            </li>
            <div className={"card-footer"}>
              And you can return and continue where you left.
            </div>
          </div>
          <div className={"text-left mt-2"}>
            <button
              onClick={() => navigate("/user/auth/register", {})}
              className={"btn btn-primary btn-lg my-3 mx-1"}
            >
              sign up
            </button>
            <button
              onClick={() => navigate("/user/auth/login", {})}
              className={"btn btn-primary btn-lg my-3 mx-1"}
            >
              login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
