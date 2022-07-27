import ContactUs from './index'
import configureEnzyme from '../../test/config'
import { render, screen } from '@testing-library/react'
import React from 'react'
import { shallow } from 'enzyme'

configureEnzyme()

describe('check all fields are present', () => {
  test('check form header text', () => {
    render(<ContactUs/>)
    const headerText = screen.getByText('Leave Us a Message')
    expect(headerText).toBeInTheDocument()
  })
  test('check all form elements are present', () => {
    const wrapper = shallow(<ContactUs/>)
    const nameField = wrapper.find({ name: 'name' })
    expect(nameField).toBeTruthy()
    const emailField = wrapper.find({ name: 'email' })
    expect(emailField).toBeTruthy()
    const subjectField = wrapper.find({ name: 'subject' })
    expect(subjectField).toBeTruthy()
    const message = wrapper.find({ name: 'message' })
    expect(message).toBeTruthy()
  })
  test('check submit button', () => {
    const wrapper = shallow(<ContactUs/>)
    const submitButton = wrapper.find('button')
    expect(submitButton).toBeTruthy()
  })
  test('check labels', () => {
    const wrapper = shallow(<ContactUs/>)
    const nameLabel = wrapper.find({ tag: 'label', htmlFor: 'name' })
    expect(nameLabel).toBeTruthy()
    const emailLabel = wrapper.find({ tag: 'label', htmlFor: 'email' })
    expect(emailLabel).toBeTruthy()
    const subjectLabel = wrapper.find({ tag: 'label', htmlFor: 'subject' })
    expect(subjectLabel).toBeTruthy()
    const messageLabel = wrapper.find({ tag: 'label', htmlFor: 'message' })
    expect(messageLabel).toBeTruthy()
  })
  test('initial values of form fields equals to empty string', () => {
    const wrapper = shallow(<ContactUs/>)
    const nameField = wrapper.find({ name: 'name' })
    expect(nameField.render().attr('value')).toEqual('')
    const emailField = wrapper.find({ name: 'email' })
    expect(emailField.render().attr('value')).toEqual('')
    const subjectField = wrapper.find({ name: 'subject' })
    expect(subjectField.render().attr('value')).toEqual('')
  })
  test('check textarea initial value is empty string', () => {
    const wrapper = shallow(<ContactUs/>)
    const messageField = wrapper.find('textarea')
    expect(messageField.prop('value')).toEqual('')
  })
  test('check field validation', () => {
    const wrapper = shallow(<ContactUs/>)
    const submitButton = wrapper.find('button')
    submitButton.simulate('click')
    wrapper.update()
    const nameInvalidFeedback = wrapper.find('#name-invalid-feedback')
    expect(nameInvalidFeedback).toBeTruthy()
    expect(submitButton.prop('disabled')).not.toBeTruthy()
  })
})
