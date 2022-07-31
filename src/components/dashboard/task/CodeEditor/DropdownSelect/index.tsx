import React from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { v4 } from "uuid";

const items = [
  {
    name: "JavaScript",
    value: "javascript",
  },
];
const DropdownSelect = () => {
  const [title, setTitle] = React.useState<string>(items[0].name);
  return (
    <div className={"my-1"}>
      <DropdownButton
        className={"btn-text"}
        align={"start"}
        title={title}
        id={"language-dropdown-menu"}
      >
        {items.map(({ name }, index: number) => {
          return (
            <Dropdown.Item
              onClick={() => setTitle(name)}
              key={`${v4()}`}
              eventKey={`${index}`}
            >
              {name}
            </Dropdown.Item>
          );
        })}
      </DropdownButton>
    </div>
  );
};

export default DropdownSelect;
