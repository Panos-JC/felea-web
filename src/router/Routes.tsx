import { Home } from "../components/home/Home";
import React from "react";
import { Switch, Route } from "react-router-dom";
import { Login } from "../components/auth/Login";
import { Register } from "../components/auth/Register";
import { RegisterMentor } from "../components/auth/RegisterMentor";
import { MentorProfilePrivate } from "../components/MentorProfile/MentorProfilePrivate";
import { MentorProfilePublic } from "../components/MentorProfile/MentorProfilePublic";
import { ProfileSettings } from "../components/MentorProfile/settings/ProfileSettings";
import { Mentors } from "../components/mentors/Mentors";
import { ProtectedRoute } from "./ProtectedRoute";
import { RegisterAdmin } from "../components/auth/RegisterAdmin";
import { DashboardLayout } from "../components/dashboard/dashboardLayout/DashboardLayout";
import { RegisterIndividual } from "../components/auth/RegisterIndividual";
// import { Subscription } from "../components/account/Subscription";
import { SessionRequest } from "../components/sessionRequest/SessionRequest";
import { MentorRequests } from "../components/mentorRequests/MentorRequests";
import { SessionRequestSuccess } from "../components/sessionRequest/success/SessionRequestSuccess";
import { NotFound } from "../components/404/NotFound";
import { ForgotPassword } from "../components/auth/ForgotPassword";
import { ChangePassword } from "../components/auth/ChangePassword";

interface RoutesProps {}

export const Routes: React.FC<RoutesProps> = () => {
  return (
    <Switch>
      <ProtectedRoute
        path="/mentor/:id"
        component={MentorProfilePublic}
        exact
      />
      <ProtectedRoute
        path="/mentor/:id/new-request"
        component={SessionRequest}
        exact
      />

      <ProtectedRoute
        path="/new-request/success"
        component={SessionRequestSuccess}
        exact
      />

      <ProtectedRoute path="/requests" component={MentorRequests} exact />

      <ProtectedRoute path="/mentors" component={Mentors} exact />
      <ProtectedRoute path="/profile" component={MentorProfilePrivate} exact />
      <ProtectedRoute
        path="/setings/profile"
        component={ProfileSettings}
        exact
      />

      <ProtectedRoute path="/dashboard" component={DashboardLayout} />

      <ProtectedRoute path="/" component={Home} exact />

      {/* <Route path="/subscribe" component={Subscription} /> */}

      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/mentor-register/:token" component={RegisterMentor} />
      <Route path="/admin-register" component={RegisterAdmin} />
      <Route path="/guest-register" component={RegisterIndividual} />
      <Route path="/forgot-password" component={ForgotPassword} />
      <Route path="/change-password/:token" component={ChangePassword} />
      <Route component={NotFound} />

      {/* <Redirect from="/" to="/mentorProfile" /> */}
    </Switch>
  );
};
