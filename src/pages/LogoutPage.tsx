import React from "react";
import { useAuth } from "../components/Authprovider";
import { useNavigate } from "react-router-dom";

export default function LogoutPage() {
  let auth = useAuth();
  let navigate = useNavigate();
  
  auth.signOut().then(() =>{
    navigate("/");
  });
  return <></>;
}
