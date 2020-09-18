import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Home/Home";
import Admin from "./Admin/Admin";
import Header from "./Header";

export default function Main() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <div>
      <Router basename={process.env.PUBLIC_URL}>
        <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
        <Switch>
          <Route path="/admin">
            <Admin isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          </Route>
          <Route path="/" exact>
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}
