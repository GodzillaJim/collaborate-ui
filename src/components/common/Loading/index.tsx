import React from "react";

const Loading = () => {
  return (
    <div id={"loader-component-container"} className={"container-fluid h-100"}>
      <div className={"row"}>
        <div className={"col text-center"}>
          <div className="spinner-border spinner-border-sm" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
