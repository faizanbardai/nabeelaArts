import React from "react";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./Home/Home";
import Admin from "./Admin/Admin";

export default function Main() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/admin" exact component={Admin} />
          <Route path="/" component={Home} />
        </Switch>
      </Router>
    </div>
  );
}
