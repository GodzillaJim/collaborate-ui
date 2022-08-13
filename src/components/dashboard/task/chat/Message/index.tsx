import React from "react";
import "./index.css";
import { faker } from "@faker-js/faker";

interface IMessage {
  message: string;
  sender: string;
  date: Date;
  avatar: string;
}
const defaultMessage = {
  message: faker.lorem.sentence(6),
  sender: faker.name.findName(),
  date: new Date(),
  avatar: faker.image.avatar(),
};
export const MessageMe = ({
  message,
  sender,
  date,
  avatar,
}: IMessage = defaultMessage) => {
  console.log("Date Me", date);
  const image =
    avatar || "https://www.pngarts.com/files/5/User-Avatar-Free-PNG-Image.png";
  return (
    <div className={"container bg-dark border-radius-sm"}>
      <div className={"row"}>
        <div className={"col-xs-1 col-sm-1 col-md-1 p-0"}>
          <img
            className={"img-fluid rounded-circle p-1"}
            src={image}
            alt={""}
          />
        </div>
        <div className={"col-xs-11 col-sm-11 col-md-11 p-0"}>
          <div className={"row"}>
            <div className={"col text-left"}>
              <span className={"text-info message-name"}>{sender}</span>
            </div>
          </div>
          <div className={"row"}>
            <div className={"col text-light message-text"}>{message}</div>
          </div>
        </div>
      </div>

      <div className={"row"}>
        <div className={"col text-left"}>
          <span className={"text-info message-date"}>{""}</span>
        </div>
      </div>
    </div>
  );
};

export const MessageStranger = ({
  message,
  sender,
  date,
  avatar,
}: IMessage = defaultMessage) => {
  React.useEffect(() => {
    console.log("Date Stranger", date);
  });
  const image =
    avatar || "https://www.pngarts.com/files/5/User-Avatar-Free-PNG-Image.png";
  return (
    <div id={"message-stranger-container"} className={"container bg-dark my-1 border-radius-sm"}>
      <div className={"row"}>
        <div className={"col-xs-11 col-sm-11 col-md-11 p-0"}>
          <div className={"row"}>
            <div className={"col text-right"}>
              <span className={"text-info message-name"}>{sender}</span>
            </div>
          </div>
          <div className={"row"}>
            <div className={"col text-right text-light p-0 message-text"}>
              <span className={"mr-2"}>{message}</span>
            </div>
          </div>
        </div>
        <div className={"col-xs-1 col-sm-1 col-md-1 p-0"}>
          <img className={"img-fluid rounded-circle p-1"} src={image} height={"24px"} alt={""} />
        </div>
      </div>

      <div className={"row"}>
        <div className={"col text-right"}>
          <span className={"text-info message-date"}></span>
        </div>
      </div>
    </div>
  );
};
