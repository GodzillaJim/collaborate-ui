import React from "react";
import App from "./App";
import { shallow } from "react-test-renderer";

describe("check app is rendered", () => {
  test("App is running", () => {
    const wrapper = shallow(<App />);
    const root = wrapper.find(".app-root");
    expect(root).toBeTruthy();
  });
});
