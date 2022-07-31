import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import AvatarMenu from './components/AvatarMenu'
import { getDashboardMenu } from '../data'

const NavBar = () => {
  const { pathname } = useLocation()
  const menuElements = getDashboardMenu()
  const isActive = React.useCallback((href: string) => {
    return href === pathname
  }, [])
  return (
      <nav className="shadow-sm navbar py-1 px-2 navbar-light bg-light navbar-expand-lg home-navbar justify-content-between">
      <a className="navbar-brand" href="#">COLLABOR@TE</a>
      <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
          <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
              {menuElements.map(({ name, href }, index) => {
                return <li key={index}>
                      <Link className={`nav-link ${isActive(href) && 'active'}`} to={href}>{name}</Link>
                  </li>
              })}
          </ul>
      </div>
          <div className={'avatar-menu'}>
              <AvatarMenu/>
          </div>
  </nav>
  )
}

export default NavBar
