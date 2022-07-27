import React from 'react'

const LoginScreen = () => {
  return <div className={'container'}>
        <div className={'row justify-content-center'}>
            <div className={'col-xs-12 col-sm-12 col-md-6 col-lg-6 col-xl-4'}>
                <div className={'card my-4'}>
                    <div className={'card-header'}>
                        Login
                    </div>
                    <div className={'card-body'}>
                        <form noValidate>
                            <div className={'form-group'}>
                                <label htmlFor={'email'} className={'form-label'}>Email</label>
                                <input type={'email'} name={'email'} className={'form-control'}/>
                            </div>
                            <div className={'form-group'}>
                                <label htmlFor={'password'} className={'form-label'}>Password</label>
                                <input type={'password'} name={'password'} className={'form-control'}/>
                            </div>
                            <div className={'form-group'}>
                                <button className={'btn btn-primary'} type={'submit'}>LOGIN</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default LoginScreen
