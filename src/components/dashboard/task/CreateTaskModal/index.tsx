import React, { useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { useFormik } from "formik";
import { object, string } from "yup";
import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import { createTaskAction } from "../../../../store/actions/tasks";
import { useNavigate } from "react-router";

interface IProps {
  /* show or hide modal */
  show: boolean;
  /* Function to hide modal */
  handleClose: () => void;
}
const CreateTaskModal = ({ show, handleClose }: IProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error, task } = useAppSelector((state) => state.createTask);
  useEffect(() => {
    if (task) {
      navigate(`/home/task/${task._id}`);
    }
  }, [task, loading, error]);
  const { values, touched, errors, submitForm, setFieldValue, handleSubmit } =
    useFormik<{
      taskName: string;
    }>({
      initialValues: { taskName: "" },
      validationSchema: object().shape({
        taskName: string().required("Please provide a name"),
      }),
      onSubmit: (val) => {
        dispatch(createTaskAction(val));
      },
    });
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <span className={"h6 text-light"}>Create Task</span>
        {error && <div className={"invalid-feedback d-block"}>{error}</div>}
      </Modal.Header>
      <Modal.Body>
        <form noValidate onSubmit={handleSubmit} className={"form"}>
          <div className={"form-group"}>
            <label className={"form-label text-light"} htmlFor={"taskName"}>
              Task Display Name
            </label>
            <input
              disabled={loading}
              type={"text"}
              name={"taskName"}
              className={"form-control bg-light"}
              onChange={(e) => setFieldValue("taskName", e.target.value)}
              value={values.taskName}
            />
            <div className={"invalid-feedback d-block"}>
              {touched.taskName && errors.taskName}
            </div>
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button disabled={loading} variant={"secondary"} onClick={handleClose}>
          Cancel
        </Button>
        <Button disabled={loading} variant={"primary"} onClick={submitForm}>
          Create Task
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateTaskModal;
