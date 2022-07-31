import React from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomeScreen from './screens/HomeScreen'
import ContactUs from './screens/contacts'
import { Provider } from 'react-redux'
import store from './store'
import ContactFormSubmitSuccess from './screens/contacts/success'
import RegisterScreen from './screens/users/auth/register'
import RegisterSuccess from './screens/users/auth/register/success'
import LoginScreen from './screens/users/auth/login'
import DashboardLayout from './components/dashboard/layout'
import Dashboard from './screens/Dashboard'
import GuestLayout from './components/guest/GuestLayout'
import LogoutScreen from './screens/users/auth/logout'
import TaskScreen from "./screens/task";

const App = () => {
  return <Provider store={store}>
      <BrowserRouter>
          <Routes>
              <Route path={'/user'} element={<GuestLayout/>}>
                  <Route path={'auth'}>
                      <Route path={'register'}>
                          <Route path={'success'} element={<RegisterSuccess/>}/>
                          <Route path={''} element={<RegisterScreen/>} />
                      </Route>
                      <Route path={'login'} element={<LoginScreen/>}/>
                  </Route>
              </Route>
              <Route path={'/home'} element={<DashboardLayout/>}>
                  <Route path={''} element={<Dashboard/>} />
                  <Route path={'logout'} element={<LogoutScreen/>} />
                  <Route path={'task/:id'} element={<TaskScreen/>} />
              </Route>
              <Route path={'contact'} element={<GuestLayout/>}>
                  <Route path={'success'} element={<ContactFormSubmitSuccess/>}/>
                  <Route path={''} element={<ContactUs/>} />
              </Route>
              <Route path ='' element={<GuestLayout/>}>
                  <Route path={''} element={<HomeScreen/>} />
              </Route>
          </Routes>
      </BrowserRouter>
  </Provider>
}

export default App
