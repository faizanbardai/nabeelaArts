import React from "react";
import SignIn from "./SignIn";
import { useState } from "react";
import AdminPanel from "./AdminPanel";

export default function Admin() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthorized(false);
  };


  return (
    <div>
      {isAuthorized ? (
        <AdminPanel logout={logout} />
      ) : (
        <SignIn setIsAuthorized={setIsAuthorized} />
      )}
    </div>
  );
}
