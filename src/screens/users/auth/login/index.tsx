import React, { useEffect } from 'react'
import { useFormik } from 'formik'
import { ILoginForm } from '../../../../types'
import { object, string } from 'yup'
import { useAppDispatch, useAppSelector } from '../../../../store/hooks'
import { loginAction } from '../../../../store/actions/user/auth'
import { Link, useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router'
import { signIn } from '../../../../services/auth'
import Facebook from '../../../../components/guest/login/Facebook'

const LoginScreen = () => {
  const [showPassword, setShowPassword] = React.useState(false)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const { loading, error, auth } = useAppSelector(state => state.auth)

  useEffect(() => {
    const state:any = location.state
    if (auth) {
      signIn(auth)
      if (state && state.redirect) {
        navigate(state.redirect)
      }
      navigate('/home')
    }
  }, [auth, location])

  const { handleSubmit, values, errors, touched, setFieldValue } = useFormik<ILoginForm>({
    initialValues: { email: '', password: '' },
    validationSchema: object().shape({
      email: string().email('Please provide a valid email!').required('Please provide a valid email!'),
      password: string().required('Please provide a password')
    }),
    onSubmit: (form: ILoginForm) => {
      dispatch(loginAction(form))
    }
  })
  return <div className={'container'}>
        <div className={'row justify-content-center'}>
            <div className={'col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-4'}>
                <div className={'card my-4'}>
                    <div className={'card-header'}>
                        Login
                    </div>
                    {error && <div className={'invalid-feedback d-block text-center'}>{error}</div>}
                    <div className={'card-body'}>
                        <form noValidate onSubmit={handleSubmit}>
                            <div className={'form-group'}>
                                <label htmlFor={'email'} className={'form-label'}>Email</label>
                                <input value={values.email} onChange={(e) => setFieldValue('email', e.target.value)} type={'email'} name={'email'} className={'form-control'}/>
                                {touched.email && <div
                                    className={'invalid-feedback d-block'}>{errors.email}</div>}
                            </div>
                            <div className={'form-group'}>
                                <label htmlFor={'password'} className={'form-label'}>Password</label>
                                <div className={'input-group'}>
                                    <input value={values.password} onChange={(e) => setFieldValue('password', e.target.value)} type={!showPassword ? 'password' : 'text'} name={'password'} className={'form-control'}/>
                                    <div className="input-group-append">
                                    <span
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="input-group-text">
                                        <i className={`bi ${showPassword ? 'bi-eye-fill' : 'bi-eye-slash-fill'}`}></i>
                                    </span>
                                    </div>
                                </div>
                                {touched.password && <div
                                    className={'invalid-feedback d-block'}>{errors.password}</div>}
                            </div>
                            <div className={'form-group'}>
                                <button disabled={loading} className={'btn btn-primary btn-block'} type={'submit'}>LOGIN</button>
                            </div>
                        </form>
                        <div className={'form-group'}>
                            <Facebook/>
                        </div>
                    </div>
                    <div className={'card-footer'}>
                        {'Don\'t have an account?'}<Link to={'/user/auth/register'}> <button className={'btn btn-link p-0'}>Create New Account</button></Link>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default LoginScreen
