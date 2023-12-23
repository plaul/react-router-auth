import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import AuthStatus from '../pages/AuthStatus'
import { useAuth } from '../components/Authprovider'

export default function Layout() {
  const auth = useAuth()
  return (
    <div>
      <nav>
      <ul style={{listStyleType: "none",display: "inlineBlock"}}>
        <li>
          <Link to="/">Public Page</Link>
        </li>
        <li>
        {auth.isLoggedInAs(["admin"]) && <Link to="/protected">Protected Page</Link> }
        {/* {auth.isLoggedIn() && <Link to="/protected">Protected Page</Link> } */}
        </li>
        <AuthStatus/>
      </ul>
</nav>
      <Outlet />
    </div>
  );
}
