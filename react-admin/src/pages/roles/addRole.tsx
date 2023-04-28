import React, { SyntheticEvent, useEffect, useState } from 'react';
import Wrapper from '../../components/wrapper';
import axios from 'axios';
import { Navigate } from 'react-router-dom';




const AddRole = () => {

    const [name, setName] = useState('');
    const [permissions, setPermissions] = useState([]);
    const [selected, setSelected] = useState([] as string[]);
    const [red, setRed] = useState(false);

    useEffect(() => {
        (
            async () => {
                const { data } = await axios.get('permission');
                setPermissions(data);
            }
        )()
    }, []);

    const checkbox = (id: string) => {
        if (selected.some(s => s === id)) {
            setSelected(selected.filter((s: any) => s !== id));
            return;
        }
        setSelected([...selected, id]);
    }

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();
        await axios.post('roles', {
            name,
            permissions: selected
        });
        setRed(true);
    }

    if (red) {
        return <Navigate to={'/roles'} />
    }

    return (
        <Wrapper>
            <form onSubmit={submit}>
                <div className="mb-3 mt-3 row">
                    <label>Name</label>
                    <input className="form-control" onChange={e => setName(e.target.value)} />
                </div>
                <div className="mb-3 mt-3 row">
                    <label>Permissions</label>
                    <div className='col-sm-10'>
                        {permissions.map((p: any) => {
                            return (
                                <div className='form-check form-check-inline col-3'>
                                    <input className='form-check-input' type="checkbox" value={p.id} onChange={() => checkbox(p.id)} />
                                    <label className='form-check-label' >{p.name}</label>
                                </div>
                            )
                        })
                        }
                    </div>
                </div>
                <button className="btn btn-outline-secondary">Save</button>
            </form>
        </Wrapper>
    );
};

export default AddRole;