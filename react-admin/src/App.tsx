import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Users from './pages/Users/Users';
import register from './pages/register';
import Login from './pages/login';
import userCreate from './pages/Users/userCreate';
import UserEdit from './pages/Users/userEdit';
import Roles from './pages/roles/Roles';
import RoleEdit from './pages/roles/roleEdit';
import AddRole from './pages/roles/addRole';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
                <Route path={'/'} Component={Dashboard}/>
                <Route path={'/users'} Component={Users}/>
                <Route path={'/users/create'} Component={userCreate}/>
                <Route path={'/roles/create'} Component={AddRole}/>
                <Route path={'/users/:id/edit'} Component={UserEdit}/>
                <Route path={'/roles/:id/edit'} Component={RoleEdit}/>
                <Route path={'/register'} Component={register}/>
                <Route path={'/login'} Component={Login}/>
                <Route path={'/roles'} Component={Roles}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
