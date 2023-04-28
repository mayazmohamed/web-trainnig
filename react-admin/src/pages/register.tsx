import React, { Component, SyntheticEvent } from 'react'
import '../register.css'
import axios from 'axios';
import { Navigate } from 'react-router-dom';


export default class register extends Component {

    first_name: string = '';
    last_name: string = '';
    email: string = '';
    password: string = '';
    password_confirm: string = '';
    state = {
      redirect: false
    };

    submit = async (e: SyntheticEvent) => {
      e.preventDefault();
        axios.post('register', {
            first_name: this.first_name,
            last_name: this.last_name,
            email: this.email,
            password: this.password,
            password_confirm: this.password_confirm
        });
          this.setState({redirect: true})
        }




  render() {
    if (this.state.redirect) {
      return (<Navigate to={'/login'} replace={true} />);
    }
    return (

        <main className="form-signin w-100 m-auto">
  <form  onSubmit={this.submit}>
    <h1 className="h3 mb-3 fw-normal">Please Register</h1>

      <input className="form-control" placeholder="First Name"  onChange={e => this.first_name = e.target.value} />

      <input className="form-control" placeholder="Last Name" onChange={e => this.last_name = e.target.value} />

      <input type="email" className="form-control"  placeholder="name@example.com" onChange={e => this.email = e.target.value} />

      <input type="password" className="form-control"  placeholder="Password" onChange={e => this.password = e.target.value} />

      <input type="password" className="form-control"  placeholder="Password Confirm" onChange={e => this.password_confirm = e.target.value} />



    <button className="w-100 btn btn-lg btn-primary" type="submit">submit</button>
  </form>
</main>
    )
  }
}
