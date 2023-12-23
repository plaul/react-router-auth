import { useAuth } from "../components/Authprovider";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function AuthStatus() {
  let auth = useAuth();
  let navigate = useNavigate();

  if(!auth.isLoggedIn()){
    return(
     <li>
        <Link to="/login">Login</Link>
     </li>
    )
  }
  else{
    return(
     <li>
        <Link to="/logout">Logout (Logged in as {auth.user?.username}) </Link>
     </li>
    )
  }
}

  


/*
export default function AuthStatus() {
  let auth = useAuth();
  let navigate = useNavigate();

 
  if(!auth.user){
    return(
  <button
        onClick={() => {
          auth.signout(() => navigate("/login"));
        }}
      >
        Login
      </button>
    )
  }

  return (
    <p>
      Welcome {auth.user}!{" "}
      <button
        onClick={() => {
          auth.signout(() => navigate("/"));
        }}
      >
        Sign out
      </button>
    </p>
  );
}
*/