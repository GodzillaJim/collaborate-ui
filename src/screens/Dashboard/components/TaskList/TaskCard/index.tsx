import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import { ITask } from "../../../../../types";
import { format, parseISO } from "date-fns";
import { useNavigate } from "react-router";
import DeleteDialog from "../../../../../components/common/DeleteDialog";
import { useAppDispatch, useAppSelector } from "../../../../../store/hooks";
import { deleteTaskAction } from "../../../../../store/actions/tasks";

const TaskCard = ({ name, updatedAt, _id }: ITask) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [confirmDelete, setDelete] = useState(false);
  const [loading, setLoading] = useState(false);

  const { loading: deleting } = useAppSelector((state) => state.deleteTask);

  const handleDelete = () => {
    setLoading(!loading);
    setDelete(!confirmDelete);
    dispatch(deleteTaskAction(_id));
  };
  const handleOpenDialog = () => {
    setLoading(!loading);
    setDelete(!confirmDelete);
  };
  const handleCloseDialog = () => {
    setLoading(!loading);
    setDelete(!confirmDelete);
  };
  const handleOpenTask = () => navigate(`/home/task/${_id}`);
  return (
    <Card>
      <Card.Body>
        <Card.Title className={"text-light"}>{name}</Card.Title>
        <Card.Text>
          <span className={"text-light"}>
            {format(parseISO(updatedAt), "do, MMM yyyy")}
          </span>
        </Card.Text>
        <div className={"w-100 text-right"}>
          <Card.Link onClick={handleOpenTask}>
            <i className="bi bi-pencil-square"></i>
          </Card.Link>
          <Card.Link onClick={handleOpenDialog} className={"text-danger"}>
            {!loading && !deleting && <i className={"bi bi-trash"}></i>}
            {(loading || deleting) && (
              <i className="spinner-border spinner-border-sm" role="status">
                <span className="sr-only">Loading...</span>
              </i>
            )}
          </Card.Link>
        </div>
      </Card.Body>
      <DeleteDialog
        show={confirmDelete}
        handleDelete={handleDelete}
        handleCancel={handleCloseDialog}
      />
    </Card>
  );
};

export default TaskCard;
