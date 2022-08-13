import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { getTaskAction } from "../../store/actions/tasks";
import CodeEditor from "../../components/dashboard/task/CodeEditor";
import DropdownSelect from "../../components/dashboard/task/CodeEditor/DropdownSelect";
import ChatContainer from "../../components/dashboard/task/chat";

const TaskScreen = () => {
  const { error, loading, task } = useAppSelector((state) => state.getTask);
  const dispatch = useAppDispatch();
  const { id } = useParams();

  useEffect(() => {
    if (!error && !loading && !task) {
      if (id) {
        dispatch(getTaskAction(id));
      }
    }
  }, [error, loading, task]);

  return (
    <div className={"container-fluid py-2"}>
      <div className={"row"}>
        <div className={"col"}>
          {error && <div className={"invalid-feedback d-block"}>{error}</div>}
          {task && (
            <div className={"container-fluid"}>
              <div className={"row"}>
                <div className={"col"}>
                  <div className={"container-fluid"}>
                    <div className={"row"}>
                      <div className={"col-md-4 col-sm-6 col-xs-6"}>
                        <div className={"text-light my-1"}>{task.name}</div>
                      </div>
                      <div className={"col-md-4 col-sm-6 col-xs-6"}>
                        <DropdownSelect />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={"row"}>
                <div className={"col-md-9 col-sm-12"}>
                  <CodeEditor />
                </div>
                <div className={"col-md-3 p-0 col-sm-12"}>
                  <ChatContainer />
                </div>
              </div>
            </div>
          )}
          {loading && <div>Loading</div>}
        </div>
      </div>
    </div>
  );
};

export default TaskScreen;
