import React, { useState } from "react";
import CreateTaskModal from "../../components/dashboard/task/CreateTaskModal";
import TaskList from "./components/TaskList"
const Dashboard = () => {
  const [createTask, setCreateTask] = useState<boolean>(false);
  return (
    <div className={"container-fluid"}>
      <div className={"row"}>
        <div className={"col"}>
          <button
            className={"btn btn-primary m-3"}
            disabled={createTask}
            onClick={() => setCreateTask(!createTask)}
          >
            <i className={"bi bi-plus"}></i>
            <span
              className={"figure-caption text-light"}
            >{` Create Task`}</span>
          </button>
          <CreateTaskModal
            show={createTask}
            handleClose={() => setCreateTask(!createTask)}
          />
        </div>
      </div>
      <div className={"row"}>
        <div className={"col"}>
          <TaskList/>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
