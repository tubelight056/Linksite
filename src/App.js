import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Authentication from "./screens/authentication/authentication.js";
import Collectionscreen from "./screens/collectionScreen/collectionScreen.js";
import Home from "./screens/home/Home.js";
import Pagenotfound from "./screens/pageNotFound/pageNotFound.js";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Authentication} />
        <Route exact path="/:name/home/:id" component={Home} />
        <Route exact path="/collection/:id" component={Collectionscreen} />
        <Route component={Pagenotfound} />
      </Switch>
    </Router>
  );
};

export default App;
