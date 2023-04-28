import React, { useEffect, useState } from 'react'
import Wrapper from '../../components/wrapper'
import axios from 'axios';
import { Link } from 'react-router-dom';


const Users = () => {
  
  const token = localStorage.getItem('token')
  const [users, setUsers] = useState([]);
  const [lastPage, setLastPage] = useState(0);
  const [page, setPage] = useState(1);
  
  useEffect(() => {
    (
      async () => {
        
        const { data } = await axios.get(`users?page=${page}`, { headers: { "Authorization": `Bearer ${token}` } })
        setUsers(data.data);
        setLastPage(data.meta.lastPage);
        
        
      }
      )()
    }, [page, token]);
    
    const pref = () => {
      if(page > 1) {
        setPage(page - 1);
      }
    }
    
    const next = () => {
      if(page < lastPage) {
        setPage(page + 1);
      }
    }
    
    const del = async (id: string) => {
      if(window.confirm('Are you sure you want to delete this record?')) {
        try{
          await axios.delete(`users/${id}`, { headers: { "Authorization": `Bearer ${token}` } })
          setUsers(users.filter((u: any) => u.id !== id));
        }catch (e) {
          localStorage.removeItem('token');
        }
        
      }
    }
    
      return (
        <Wrapper>
          <div className='btn-group mr-2'>
            <Link to={'/users/create'} className='btn btn-sm btn-outline-secondary' >ADD</Link>

            </div>
            <div className="table-responsive">
                <table className="table table-striped table-sm">
                  <thead>
                    <tr>
                      <th >ID</th>
                      <th >First Name</th>
                      <th >Last Name</th>
                      <th >Email</th>
                      <th >Role</th>
                    </tr>
                  </thead>
                  <tbody>
                     {
                      users.map((user: any) => {
                        return (
                          <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.first_name}</td>
                            <td>{user.last_name}</td>
                            <td>{user.email}</td>
                            <td>{user.role?.name}</td>
                            <td>
                              <div className='btn-group mr-2'>
                                <Link to={`/users/${user.id}/edit`}  className='btn btn-sm btn-outline-secondary' >Edit</Link>

                                <Link to={''} className='btn btn-sm btn-outline-secondary' onClick={() => del(user.id)}>Delete</Link>

                              </div>
                            </td>
                          </tr>
                        )
                      })
                    
                      }
                  </tbody>
                </table>
            </div>
            <nav className='flex justify-content-center'>
              <ul className='pagination'>
                <li className='page-item'>
                  <Link to={'#'} className='page-link' onClick={pref} >Previous</Link>
                </li>
                <li className='page-item'>
                  <p className='page-link' >{page}</p>
                </li>
                <li className='page-item'>
                  <Link to={'#'} className='page-link' onClick={next}>next</Link>
                </li>
              </ul>
            </nav>

        </Wrapper>
    )

}


export default Users