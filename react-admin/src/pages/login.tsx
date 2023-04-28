import axios from "axios";
import React, { SyntheticEvent } from "react";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [red, setRed] = React.useState(false);

    const submit = async (e: SyntheticEvent) => {
        e.preventDefault();
        await axios.post("login", {
            email,
            password
        }
        ).then((res) => {

            localStorage.setItem('token', res.data.token);

        });
        setRed(true)
    };

    if (red) {
        return <Navigate to={'/'} />
    }
    
    return (
        <main className="form-signin w-100 m-auto">
            <form onSubmit={submit}>
              <h1 className="h3 mb-3 fw-normal">Please Sign in</h1>

                <input type="email" className="form-control"  placeholder="name@example.com"  onChange={e => setEmail(e.target.value)} />

                <input type="password" className="form-control"  placeholder="Password" onChange={e => setPassword(e.target.value)} />

                <button className="w-100 btn btn-lg btn-primary" type="submit">submit</button>
                <p><Link to={'/register'}>Sign in</Link></p>
            </form>
        </main>
    );
}

export default Login;