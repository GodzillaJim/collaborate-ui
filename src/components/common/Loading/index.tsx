import React from "react";

const Loading = () => {
  return (
    <div id={"loader-component-container"} className={"container-fluid h-100"}>
      <div className={"row"}>
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </div>
  );
};

export default Loading;
