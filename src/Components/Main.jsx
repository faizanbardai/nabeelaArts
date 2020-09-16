import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Home/Home";
import Admin from "./Admin/Admin";
import Header from "./Header";

export default function Main() {
  return (
    <div>
      <Router basename={process.env.PUBLIC_URL}>
        <Header />
        <Switch>
          <Route path="/admin">
            <Admin />
          </Route>
          <Route path="/" exact>
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}
