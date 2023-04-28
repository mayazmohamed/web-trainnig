import React, { useEffect, useState } from "react"
import Wrapper from "../../components/wrapper"
import axios from "axios"
import { Link } from "react-router-dom"

const Roles = () => {


    const [roles, setRoles] = useState([])

    useEffect(() => {
        (
            async () => {
                const response = await axios.get('roles')
                setRoles(response.data)
            }
        )()
    }, [])

    const del = async (id: string) => {
        if(window.confirm('Are you sure you want to delete this record?')) {
            await axios.delete(`roles/${id}`)
            setRoles(roles.filter((u: any) => u.id !== id));
        }
      }

    return (
        <Wrapper>
            <div className='btn-group mr-2'>
                <Link to={'/roles/create'} className='btn btn-sm btn-outline-secondary' >ADD</Link>

            </div>
            <div className="table-responsive">
                <table className="table table-striped table-sm">
                  <thead>
                    <tr>
                      <th >ID</th>
                      <th >Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {roles.map((role: any) => {
                        return (
                            <tr key={role.id}>
                                <td>{role.id}</td>
                                <td>{role.name}</td>
                                <td>
                              <div className='btn-group mr-2'>
                                <Link to={`/roles/${role.id}/edit`}  className='btn btn-sm btn-outline-secondary' >Edit</Link>

                                <Link to={''} className='btn btn-sm btn-outline-secondary' onClick={() => del(role.id)}>Delete</Link>

                              </div>
                            </td>
                            </tr>
                        )
                    })}
                  </tbody>
                </table>
            </div>
        </Wrapper>
    )
}

export default Roles