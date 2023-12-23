import * as React from "react";
import { useContext } from "react";
import {
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
  Navigate,
  Outlet,
} from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import LogoutPage from "./pages/LogoutPage";
import RequireAuth from "./components/RequireAuth";
import Layout from "./pages/Layout";
import { useAuth } from "./components/Authprovider";

import { AuthProvider } from "./components/Authprovider";

export default function App() {
  const auth = useAuth();
  return (
    <AuthProvider>
      <h1>Auth Example</h1>

      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<PublicPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/logout" element={<LogoutPage />} />
          <Route
            path="/protected"
            element={
              // <RequireAuth>
              <RequireAuth roles={["admin"]}>
                <ProtectedPage />
              </RequireAuth>
            }
          />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

function PublicPage() {
  return <h3>Public</h3>;
}

function ProtectedPage() {
  return <h3>Protected</h3>;
}
