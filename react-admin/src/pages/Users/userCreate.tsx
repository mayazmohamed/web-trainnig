import React, { SyntheticEvent, useEffect, useState } from 'react'
import Wrapper from '../../components/wrapper'
import axios from 'axios'
import { Navigate } from 'react-router-dom'

const UserCreate =() => {

    const [first_name, setFirst_name] = useState('')
    const [last_name, setLast_name] = useState('')
    const [email, setEmail] = useState('')
    const [role_id, setRoleID] = useState('')
    const [roles, setRoles] = useState([])
    const token = localStorage.getItem('token');
    const [red, setRed] = useState(false);

    useEffect(() => {
        (
            async () => {
              
                const { data } = await axios.get('roles', {headers: { "Authorization": `Bearer ${token}` } })
                setRoles(data);
                
            }
        )()

    }, [token]);

    console.log(
        first_name,
        last_name,
        email,
        role_id
    )

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();
    
        await axios.post('users', {
            first_name,
            last_name,
            email,
            role_id
        }, {headers: { "Authorization": `Bearer ${token}` } })
        setRed(true);
    
    }

    if (red) {
        return <Navigate to={'/users'} />
    }

    return (
        <Wrapper>
            <form onSubmit={submit} >
                <div className="mb-3">
                    <label>First Name</label>
                    <input className="form-control" onChange={e => setFirst_name(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label>Last Name</label>
                    <input className="form-control" onChange={e => setLast_name(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label>Email</label>
                    <input className="form-control" onChange={e => setEmail(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label>Role</label>
                    <select className="form-control" onChange={e => setRoleID(e.target.value)}>
                        {
                            roles.map((r: any) => {
                                return (
                                    <option key={r.id} value={r.id}>{r.name}</option>
                                )
                            })
                        }
                    </select>
                </div>
                <button className="btn btn-outline-secondary">Save</button>
            </form>
        </Wrapper>
    )
}

export default UserCreate