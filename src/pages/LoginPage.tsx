import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../components/Authprovider";
import { useState } from "react";
import type { User } from "../auth";

export default function LoginPage() {
  let navigate = useNavigate();
  let location = useLocation();
  let auth = useAuth();
  const [err, setErr] = useState(null);

  let from = location.state?.from?.pathname || "/";

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    let formData = new FormData(event.currentTarget);
    let user = Object.fromEntries(formData) as unknown as User;
    setErr(null)
    auth
      .signIn(user)
      .then(() => {
        navigate(from, { replace: true });
      })
      .catch((err) => {
        setErr(err);
      });
  }

  return (
    <div>
      <h2>Login</h2>
      {location.state?.from?.pathname && (
        <h4>You must log in to view the page at {from}</h4>
      )}

      <form onSubmit={handleSubmit}>
        <label>
          Username: <input name="username" type="text" />
        </label>{" "}
        <br />
        <label>
          Password: <input type="password" name="password" />
        </label>{" "}
        <br />
        <button type="submit">Login</button>
      </form>
      <p style={{ color: "red" }}>{err}</p>
    </div>
  );
}
