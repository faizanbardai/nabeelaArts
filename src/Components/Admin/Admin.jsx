import React, { useEffect } from "react";
import SignIn from "./SignIn";
import { useState } from "react";
import AdminPanel from "./AdminPanel";
import { api_refresh_token } from "../../Services";

export default function Admin() {
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    checkTokenStatus();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthorized(false);
  };

  const checkTokenStatus = async () => {
    if (localStorage.getItem("token")) {
      const response = await api_refresh_token(localStorage.getItem("token"));
      switch (response.status) {
        case 200:
          // OK
          const newToken = await response.json();
          localStorage.setItem("token", newToken.token);
          setIsAuthorized(true);
          break;
        case 401:
          // unauthorized
          localStorage.removeItem("token");
          alert("Unauthorized!");
          break;
        default:
          console.log("Some error");
      }
    }
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
