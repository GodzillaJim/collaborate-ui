import React from 'react'
import NavigationBar from '../../navigation/NavigationBar'
import { Outlet } from 'react-router'
import Footer from '../../navigation/Footer'

const GuestLayout = () => {
  return <div className={'container-fluid'}>
      <div className={'row'}>
          <div className={'col p-0'}>
              <NavigationBar/>
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
  </div>
}

export default GuestLayout
