import { Home } from "../components/home/Home";
import React from "react";
import { Switch, Route } from "react-router-dom";
import { Login } from "../components/auth/Login";
import { Register } from "../components/auth/Register";
import { RegisterMentor } from "../components/auth/RegisterMentor";
import { MentorProfilePrivate } from "../components/MentorProfile/MentorProfilePrivate";
import { MentorProfilePublic } from "../components/MentorProfile/MentorProfilePublic";
import { ProfileSettings } from "../components/MentorProfile/ProfileSettings";
import { Mentors } from "../components/mentors/Mentors";
import { ProtectedRoute } from "./ProtectedRoute";
import { RegisterAdmin } from "../components/auth/RegisterAdmin";
import { DashboardLayout } from "../components/dashboard/dashboardLayout/DashboardLayout";
import { Sessions } from "../components/sessions/Sessions";
import { SessionPage } from "../components/sessions/SessionPage";

interface RoutesProps {}

export const Routes: React.FC<RoutesProps> = () => {
  return (
    <Switch>
      <ProtectedRoute
        path="/mentor/:id"
        component={MentorProfilePublic}
        exact
      />
      <ProtectedRoute path="/mentors" component={Mentors} exact />
      <ProtectedRoute path="/profile" component={MentorProfilePrivate} exact />
      <ProtectedRoute
        path="/setings/profile"
        component={ProfileSettings}
        exact
      />

      <ProtectedRoute path="/sessions" component={Sessions} exact />
      <ProtectedRoute path="/sessions/:id" component={SessionPage} exact />

      <ProtectedRoute path="/dashboard" component={DashboardLayout} />

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
      <Route path="/admin-register">
        <RegisterAdmin />
      </Route>

      {/* <Redirect from="/" to="/mentorProfile" /> */}
    </Switch>
  );
};
