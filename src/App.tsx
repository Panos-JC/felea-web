import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Login } from "./pages/auth/Login";
import { MentorProfile } from "./pages/MentorProfile";
import store from "./redux/store";
import { Provider } from "react-redux";
import { Register } from "./pages/auth/Register";
import { RegisterMentor } from "./pages/auth/RegisterMentor";
import { Home } from "./pages/Home";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <ProtectedRoute path="/mentor/:id" component={MentorProfile} exact />

          <ProtectedRoute path="/" component={Home} exact />

          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/mentor-register">
            <RegisterMentor />
          </Route>

          {/* <Redirect from="/" to="/mentorProfile" /> */}
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
