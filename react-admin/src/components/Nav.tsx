import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { User } from '../modeles/user';


const Nav = () =>  {
  
  const [user, setUser] = useState(new User());

  const token = localStorage.getItem('token')
  useEffect( () => {
    (
      async () => {
        try{
        const {data} = await axios.get('user', {headers: {"Authorization" : `Bearer ${token}`}})
        setUser(new User (
          data.id,
          data.first_name,
          data.last_name,  
          data.email,
          data.role
        ))
      }catch (e) {
        localStorage.removeItem('token');
      }
      })()
    }, [token]
    );


    const logout = () => {
      localStorage.removeItem('token');
    }

    return (
          <nav className='navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0 shadow'>
            <Link to='#' className='navbar-brand col-md-3 col-lg-2 mr-0 px-3'>Company Name</Link>
            <ul className='my-2 my-md-0 mr-md-3'>
              <Link className='p-2 text-white text-decoration-none' to='/users'>{user.fullName}</Link>
              <Link className='p-2 text-white text-decoration-none' to='/login' onClick={logout} >Sign out</Link>
            </ul>
          </nav>
      )

}

export default Nav