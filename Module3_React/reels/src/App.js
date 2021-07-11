import React, { useContext, useEffect } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Header from "./Components/Header";
import Feeds from "./Components/Feeds";
import Login from "./Components/Login";
import Profile from "./Components/Profile";
import SignUp from "./Components/SignUp";
import { AuthContext, AuthProvider } from "./context/AuthProvider";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Header></Header>
          <Switch>
            <Route path="/login" component={Login} exact></Route>
            <Route path="/signup" component={SignUp} exact></Route>
            <PrivateRoute path="/" component={Feeds}></PrivateRoute>
            <PrivateRoute path="/profile" component={Profile}></PrivateRoute>
          </Switch>
        </div>
      </Router>
    </AuthProvider>
  );
}

function PrivateRoute(props) {
  let {component, path } = props;
  // Feeds ?? loggedIn and path="/"
  let { currentUser } = useContext(AuthContext);

  return currentUser ? (
    <Route path={path} component={component}></Route>
  ) : (
    <Redirect to="/login"></Redirect>
  );
}

export default App;