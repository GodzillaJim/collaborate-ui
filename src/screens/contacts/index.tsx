import React, { useEffect } from 'react'
import { useFormik } from 'formik'
import { IContactForm } from '../../types'
import { object, string } from 'yup'
import { submitContactFormAction } from '../../store/actions/contact'
import { useAppDispatch, useAppSelector } from '../../store/hooks'
import { RootState } from '../../store'
import { useNavigate } from 'react-router'

const ContactUs = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const { loading, error, success } = useAppSelector((state: RootState) => state.submitContactForm)
  useEffect(() => {
    if (success) {
      navigate(`/contact/success?name=${values.name}`)
    }
  }, [success])
  const { values, setFieldValue, errors, handleSubmit, touched } = useFormik<IContactForm>({
    initialValues: {
      email: '', subject: '', message: '', name: ''
    },
    validationSchema: object().shape({
      email: string().required('Please provide an email'),
      name: string().required('Please provide a name'),
      subject: string().required('Please provide a subject'),
      message: string().required('Please provide a message')

    }),
    onSubmit: (form:IContactForm) => {
      dispatch(submitContactFormAction(form))
    }
  })

  return <div className={'container'}>
      <div className={'row justify-content-center'}>
          <div className={'col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-4'}>
              <div className={'card mt-2'}>
                  <div className={'card-header'}>
                      {error && <p className={'text-error'}>{error}</p>}
                      <h6>Leave Us a Message</h6>
                  </div>
                  <div className={'card-body'}>
                      <form onSubmit={handleSubmit} noValidate>
                          <div className="mb-3 form-group">
                              <label htmlFor="name"
                                     className="form-label">Name</label>
                              <input type="text" className="form-control"
                                     id="contact-us-name" name={'name'}
                                     value={values.name}
                                     onChange={(e) => setFieldValue('name', e.target.value)}
                                     aria-describedby="nameHelp"/>
                              {touched.name && <div id={'name-invalid-feedback'}
                                  className={'invalid-feedback d-block'}>{errors.name}</div>}
                          </div>
                          <div className="mb-3 form-group">
                              <label htmlFor="email"
                                     className="form-label">Email</label>
                              <input type="email" name={'email'} className="form-control"
                                     id="contact-us-email" value={values.email}
                                     onChange={(e) => setFieldValue('email', e.target.value)}
                                     aria-describedby="nameHelp"/>
                              {touched.email && <div id={'email-invalid-feedback'} className={'d-block invalid-feedback'}>{errors.email}</div>}
                          </div>
                          <div className="mb-3 form-group">
                              <label htmlFor="subject"
                                     className="form-label">Subject</label>
                              <input type="text" name={'subject'} value={values.subject} className="form-control"
                                     onChange={(e) => setFieldValue('subject', e.target.value)}
                                     id="contact-us-subject"/>
                              {touched.subject && <div className={'invalid-feedback d-block'}
                                  id={'subject-invalid-feedback'}>{errors.subject}</div>}
                          </div>
                          <div className="mb-3 form-group">
                              <label htmlFor="contact-us-message"
                                     className="form-label">Message</label>
                              <textarea className="form-control" name={'message'}
                                        onChange={(e) => setFieldValue('message', e.target.value)}
                                        id="contact-us-message" value={values.message}
                                        rows={3}/>
                              {touched.message && <div className={'invalid-feedback d-block'}
                                                       id={'subject-invalid-feedback'}>{errors.message}</div>}
                          </div>
                          <button disabled={loading} type="submit" className="btn btn-primary">Submit
                          </button>
                      </form>
                  </div>
              </div>
          </div>
      </div>
  </div>
}

export default ContactUs
