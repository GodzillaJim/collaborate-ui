import React from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NavigationBar from './components/navigation/NavigationBar'
import Footer from './components/navigation/Footer'
import HomeScreen from './screens/HomeScreen'
import ContactUs from './screens/contacts'
import { Provider } from 'react-redux'
import store from './store'
import ContactFormSubmitSuccess from './screens/contacts/success'
import RegisterScreen from './screens/users/auth/register'

const App = () => {
  return <Provider store={store}>
      <BrowserRouter>
          <div className={'container-fluid app-root'}>
              <div className={'row'}>
                  <NavigationBar/>
              </div>
              <div className={'row content-body'}>
                  <Routes>
                      <Route path={'/user'}>
                          <Route path={'auth'}>
                              <Route path={'register'} element={<RegisterScreen/>} />
                          </Route>
                      </Route>
                      <Route path={'/contact/success'} element={<ContactFormSubmitSuccess/>}/>
                      <Route path={'/contact'} element={<ContactUs/>} />
                      <Route path={'/'} element={<HomeScreen/>} />
                  </Routes>
              </div>
              <div className={'row'}>
                  <Footer/>
              </div>
          </div>
      </BrowserRouter>
  </Provider>
}

export default App
