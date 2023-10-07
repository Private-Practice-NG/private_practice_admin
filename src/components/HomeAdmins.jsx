import React from 'react'
import './styles/homeadmins.css'
import AdminListCard from './AdminListCard'
import { Link } from 'react-router-dom'
const HomeAdmins = () => {
  return (
    <div className='home-admins'>
        <h1 className='home-admins-title'>Admins</h1>
        <div className="home-admin-cards">
            <AdminListCard activated={true} />
            <AdminListCard />
            <Link to="/" className='home-admin-view-all'>View All</Link>
        </div>
    </div>
  )
}

export default HomeAdmins