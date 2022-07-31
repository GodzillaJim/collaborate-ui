import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { queryByAttribute } from "@testing-library/react";

const configureEnzyme = () => {
  configure({ adapter: new Adapter() });
};

export const getElementById = queryByAttribute.bind(null, "id");
export default configureEnzyme;
