import useQuery from "../../../../../hooks/query";
import React from "react";

const RegisterSuccess = () => {
  const query = useQuery();
  return (
    <div className={"container-fluid"}>
      <div className={"card w-100 h-100"}>
        <div className={"card-body"}>
          <div className={"row"}>
            <div className={"col"}>
              <h1 className={"text-success"}>{`Thank you ${
                query.get("name") || ""
              }!!`}</h1>
              <h6>Login to get started!!</h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default RegisterSuccess;
