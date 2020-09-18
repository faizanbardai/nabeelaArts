import React, { useEffect } from "react";
import SignIn from "./SignIn";
import AdminPanel from "./AdminPanel";
import { api_refresh_token } from "../../Services";

export default function Admin(props) {
  const { isLoggedIn, setIsLoggedIn } = props;

  useEffect(() => {
    checkTokenStatus();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);



  const checkTokenStatus = async () => {
    if (localStorage.getItem("token")) {
      const response = await api_refresh_token(localStorage.getItem("token"));
      switch (response.status) {
        case 200:
          // OK
          const newToken = await response.json();
          localStorage.setItem("token", newToken.token);
          setIsLoggedIn(true);
          break;
        case 401:
          // unauthorized
          localStorage.removeItem("token");
          alert("Unauthorized or token expired");
          break;
        default:
          console.log("Some error");
      }
    }
  };

  return (
    <div>
      {isLoggedIn ? (
        <AdminPanel />
      ) : (
        <SignIn setIsLoggedIn={setIsLoggedIn} />
      )}
    </div>
  );
}
