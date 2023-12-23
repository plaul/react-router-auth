import type { removeListener } from "process";
import { useAuth } from "./Authprovider";
import { Navigate, useLocation } from "react-router-dom";

type Props = {
  children: JSX.Element;
  roles?: string[];
};
export default function RequireAuth({ children,roles }: Props) {
  let auth = useAuth();
  let location = useLocation();
  if (roles) {
    if (!auth.isLoggedInAs(roles)) {
      return <Navigate to="/login" replace />;
    }
  }
  if (!auth.user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return children
}