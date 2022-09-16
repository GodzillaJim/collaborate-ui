import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import Loading from "../../../../components/common/Loading";
import ErrorMessage from "../ErrorMessage";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { InputGroup, Form } from "react-bootstrap";
import { v4 } from "uuid";
import { getTasksAction } from "../../../../store/actions/tasks";
import { ITask } from "../../../../types";
import TaskCard from "./TaskCard";
import { parseISO, isBefore, isEqual } from "date-fns";

const TaskList = () => {
  const dispatch = useAppDispatch();
  const { loading, error, tasks } = useAppSelector((state) => state.getTasks);
  const { auth } = useAppSelector((state) => state.auth);

  const [search, setSearch] = React.useState("");

  const handleGetTasks = () => {
    dispatch(getTasksAction());
  };

  useEffect(() => {
    if (!loading && !error && !tasks) {
      handleGetTasks();
    }
  }, [loading, error, tasks, auth]);

  const filteredTasks = React.useMemo(() => {
    const temp = tasks ? (tasks as ITask[]) : [];
    let anotherTemp = [...temp];
    anotherTemp.sort((taskA: ITask, taskB: ITask) => {
      const dateA = parseISO(taskA.createdAt);
      const dateB = parseISO(taskB.createdAt);
      if (isBefore(dateB, dateA)) {
        return -1;
      } else if (isEqual(dateA, dateB)) {
        return 0;
      } else {
        return 1;
      }
    });
    anotherTemp = anotherTemp.slice(0, 10);
    return anotherTemp.filter((task) =>
      task.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [tasks, search]);

  return (
    <div className={"container-fluid"}>
      <div className={"row"}>
        <div className={"col"}>
          {loading && <Loading />}
          {error && (
            <ErrorMessage message={error} retryAction={handleGetTasks} />
          )}
          {tasks && (
            <div className={"container-fluid"}>
              <div className={"row my-1"}>
                <div className={"col"}>
                  <span className={"h5 text-light"}>My Tasks</span>
                </div>
                {tasks && tasks.length > 5 && (
                  <div className={"col"}>
                    <InputGroup className="mb-3">
                      <InputGroup.Text id="basic-addon1">
                        <i className={"bi bi-search"}></i>
                      </InputGroup.Text>
                      <Form.Control
                        placeholder="Enter query to filter"
                        aria-label="search"
                        aria-describedby="basic-addon1"
                        className={"bg-light"}
                        value={search}
                        onChange={(event) =>
                          setSearch(event.target.value || "")
                        }
                      />
                    </InputGroup>
                  </div>
                )}
              </div>
              <Row xs={1} sm={2} md={3} className={"g-3"}>
                {filteredTasks.map((task) => {
                  return (
                    <Col className={"my-1"} key={`key-${v4()}`}>
                      <TaskCard {...task} />
                    </Col>
                  );
                })}
              </Row>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskList;
