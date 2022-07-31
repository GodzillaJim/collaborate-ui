import React from 'react'
import './index.css'
import { useAppSelector } from '../../../../../store/hooks'
import { RootState } from '../../../../../store'
import { dropdownMenuItems } from '../../../data'
import { v4 } from 'uuid'
import { Link, useLocation } from 'react-router-dom'

interface IAvatarMenu{
    /* URL to the image */
    avatar?: string;
    /* Items to be displayed in the avatar dropdown menu. Contains fields name and href */
    dropdownMenuItems?: { name: string, href: string}[]
}
const AvatarMenu = (props: IAvatarMenu) => {
  const { avatar: pic, dropdownMenuItems: items } = props
  const location = useLocation()
  const { auth } = useAppSelector((state: RootState) => state.auth)
  const menuItems = items || dropdownMenuItems()
  return <div className={'nav-item dropdown'}>
      <a className="nav-link dropdown-toggle text-dark px-2 py-0" href="#"
         id="navbarDropdownMenuLink" role="button" data-toggle="dropdown"
         aria-haspopup="true" aria-expanded="false">
          <img
              src={pic || (auth && auth.avatar) || 'https://s3.eu-central-1.amazonaws.com/bootstrapbaymisc/blog/24_days_bootstrap/fox.jpg'}
              width="30" height="30" className="rounded-circle"/>
      </a>
      <div className="dropdown-menu popup-menu-left" aria-labelledby="navbarDropdownMenuLink">
          {menuItems.map(({ name, href }) => <Link key={v4()} className="dropdown-item" state={{ redirect: location.pathname }} to={href}>{name}</Link>)}
      </div>
  </div>
}

export default AvatarMenu
