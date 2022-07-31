import React, { useEffect } from 'react'
import NavBar from '../navigation'
import { Outlet, useNavigate } from 'react-router'
import Footer from '../../navigation/Footer'
import { useLocation } from 'react-router-dom'
import { isAuthenticated } from '../../../services/auth'
import { useAppSelector } from '../../../store/hooks'

const DashboardLayout = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const { auth } = useAppSelector(state => state.auth)
  useEffect(() => {
    checkAuthStatus()
  }, [auth, location])
  const checkAuthStatus = () => {
    isAuthenticated(auth, () => '', () => navigate('/user/auth/login', { state: { redirect: location.pathname } }))
  }
  return (<div className={'container-fluid'}>
        <div className={'row'}>
            <div className={'col p-0'}>
                <NavBar/>
            </div>
        </div>
        <div className={'row'}>
            <div className={'col outlet'}>
                <Outlet/>
            </div>
        </div>
      <div className={'row'}>
          <Footer/>
      </div>
    </div>)
}
export default DashboardLayout
