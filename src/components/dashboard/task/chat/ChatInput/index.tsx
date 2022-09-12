import React from "react";
import { useFormik } from "formik";
import { object, string } from "yup";
import "./index.css";
import { v4 } from "uuid";

export interface IChatMessage {
  message: string;
  sender: string;
  avatar: string;
  date: Date;
  id: string;
}

interface IChatInput {
  username: string;
  avatar: string;
  handleSendMessage: (message: IChatMessage) => void;
}

const ChatInput = ({ username, avatar, handleSendMessage }: IChatInput) => {
  const { handleSubmit, setFieldValue, isValid, values } = useFormik<{
    message: string;
  }>({
    initialValues: { message: "" },
    validationSchema: object().shape({
      message: string().required(""),
    }),
    onSubmit: ({ message }) => {
      handleSendMessage({
        message: message,
        sender: username,
        avatar,
        date: new Date(),
        id: `${username}-${v4()}`,
      });
      setFieldValue("message", "");
    },
  });

  return (
    <div className={"row"}>
      <div className={"col "}>
        <form noValidate onSubmit={handleSubmit}>
          <div className={"input-group"}>
            <input
              type={"text"}
              aria-label={"chat-input-message"}
              name={"message"}
              className={"form-control bg-light"}
              onChange={(e) => setFieldValue("message", e.target.value)}
              value={values.message}
            />
            <div className={"input-group-append"}>
              <button
                disabled={!isValid}
                type={"submit"}
                className={"btn btn-dark btn-sm text-light"}
              >
                SEND
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default ChatInput;
