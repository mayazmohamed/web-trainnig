import React, { SyntheticEvent, useEffect, useState } from 'react'
import Wrapper from '../../components/wrapper'
import axios from 'axios'
import { Navigate, useParams } from 'react-router-dom'

const RoleEdit =() => {

    const {id} = useParams();
    const [name, setName] = useState('')
    const [red, setRed] = useState(false);

    const [roles, setRoleID] = useState([])

    useEffect(() => {
        (
            async () => {
                const {data} = await axios.get(`roles/`)
                setRoleID(data);

                const response = await axios.get(`roles/${id}`)
                setName(response.data.name);
                console.log(response.data.name);
            }
        )()
    }, [name])

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();
        await axios.put(`roles/${id}`, {
            name
        })
        setRed(true);
    }

    if (red) {
        return <Navigate to={'/roles'} />
    }

    return (
        <Wrapper>
            <form onSubmit={submit} >
            <div className="mb-3">
                    <label>Last Name</label>
                    <input className="form-control" defaultValue={name} 
                    onChange={e => setName(e.target.value)} />
                </div>
                <button className="btn btn-outline-secondary">Save</button>
            </form>
        </Wrapper>
    )
}

export default RoleEdit