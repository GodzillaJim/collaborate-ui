import ContactUs from './index'
import configureEnzyme from "../../test/config";
import {render, screen} from "@testing-library/react";

configureEnzyme()
describe('check all fields are present', () => {
  test('check form header text', () => {
    render(<ContactUs/>)
  })
})
