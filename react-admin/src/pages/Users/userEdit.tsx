import React, { SyntheticEvent, useEffect, useState } from 'react'
import Wrapper from '../../components/wrapper'
import axios from 'axios'
import { Navigate, useParams } from 'react-router-dom'

const UserEdit =() => {

    const {id} = useParams();

    const [first_name, setFirst_name] = useState('')
    const [last_name, setLast_name] = useState('')
    const [email, setEmail] = useState('')
    const [role, setRoleID] = useState('')
    const [roles, setRoles] = useState([])
    const token = localStorage.getItem('token');
    const [red, setRed] = useState(false);

    useEffect(() => {
        (
            async () => {
                
                const  response  = await axios.get('roles', {headers: { "Authorization": `Bearer ${token}` } })
                setRoles(response.data);
                
                
                
                const {data} = await axios.get(`users/${id}`, {headers: { "Authorization": `Bearer ${token}` } });
                
                setFirst_name(data.first_name);
                setLast_name(data.last_name);
                setEmail(data.email);
                setRoleID(data.role.id);
                
            }

        )()
    }, [token, id]);


    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();
        await axios.put(`users/${id}`, {
            first_name,
            last_name,
            email,
            role
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
                    <input className="form-control" defaultValue={first_name}
                     onChange={e => setFirst_name(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label>Last Name</label>
                    <input className="form-control" defaultValue={last_name} 
                    onChange={e => setLast_name(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label>Email</label>
                    <input className="form-control" defaultValue={email} 
                    onChange={e => setEmail(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label>Role</label>
                    <select className="form-control" value={role} 
                    onChange={e => setRoleID(e.target.value)}>
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

export default UserEdit