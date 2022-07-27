import React from 'react'
import { useFormik } from 'formik'
import { IRegistrationForm } from '../../../../types'
import { object, ref, string } from 'yup'
import { isEmpty } from 'lodash'

const RegisterScreen = () => {
  const { handleSubmit, touched, errors, values, isValid } = useFormik<IRegistrationForm>({
    initialValues: {
      firstName: '', lastName: '', email: '', password: '', confirmPassword: ''
    },
    validationSchema: object().shape({
      firstName: string().required('Please provide a first name'),
      lastName: string().required('Please provide a last name'),
      email: string().required('Please provide an email').email('Please provide a valid email'),
      password: string().required('Please provide a password').min(6, 'Password must be at least 6 characters long'),
      passwordConfirmation: string()
        .oneOf([ref('password'), null], 'Passwords must match')
    }),
    onSubmit: (_form: IRegistrationForm) => {
      // On submit form
    }
  })

  return <div className={'container'}>
    <div className={'row justify-content-center'}>
      <div className={'col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-4'}>
        <div className={'card w-100'}>
          <div className={'card-header'}>
            <h6>Register an Account</h6>
          </div>
          <div className={'card-body'}>
            <form onSubmit={handleSubmit} className={'form'} noValidate>
              <div className={'form-group'}>
                <label htmlFor={'firstName'} className={'form-label'}>First Name</label>
                <input type={'text'} className={'form-control'} name={'firstName'} value={values.firstName}/>
                {touched.firstName && <div className={'invalid-feedback'}>{errors.firstName}</div>}
              </div>
              <div className={'form-group'}>
                <label htmlFor={'lastName'} className={'form-label'}>Last Name</label>
                <input type={'text'} className={'form-control'} name={'lastName'} value={values.lastName}/>
                {touched.lastName && <div className={'invalid-feedback'}>{errors.lastName}</div>}
              </div>
              <div className={'form-group'}>
                <label htmlFor={'email'} className={'form-label'}>Email</label>
                <input type={'email'} className={'form-control'} name={'email'} value={values.email}/>
                {touched.email && <div className={'invalid-feedback'}>{errors.email}</div>}
              </div>
              <div className={'form-group'}>
                <label htmlFor={'password'} className={'form-label'}>Password</label>
                <input type={'password'} className={'form-control'} name={'password'} value={values.password}/>
                {touched.password && <div className={'invalid-feedback'}>{errors.password}</div>}
              </div>
              <div className={'form-group'}>
                <label htmlFor={'confirmPassword'} className={'form-label'}>Confirm Password</label>
                <input type={'password'} className={'form-control'} name={'confirmPassword'} value={values.confirmPassword}/>
                {touched.confirmPassword && <div className={'invalid-feedback'}>{errors.confirmPassword}</div>}
              </div>
              <div className={'form-group'}>
                <button disabled={!isEmpty(errors) || !isValid} className={'btn btn-block btn-primary'} type={'submit'}>
                  <i className={'bi bi-person mx-1'} style={{ fontSize: '13px' }}></i><span>REGISTER</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
}

export default RegisterScreen
