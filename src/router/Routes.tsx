import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { Login } from "../components/auth/Login";
import { RegisterMentor } from "../components/auth/RegisterMentor";
import { MentorProfilePrivate } from "../components/MentorProfile/MentorProfilePrivate";
import { MentorProfilePublic } from "../components/MentorProfile/MentorProfilePublic";
import { ProfileSettings } from "../components/MentorProfile/settings/ProfileSettings";
import { Mentors } from "../components/mentors/Mentors";
import { ProtectedRoute } from "./ProtectedRoute";
import { RegisterAdmin } from "../components/auth/RegisterAdmin";
import { DashboardLayout } from "../components/dashboard/dashboardLayout/DashboardLayout";
import { RegisterIndividual } from "../components/auth/RegisterIndividual";
import { SessionRequest } from "../components/sessionRequest/SessionRequest";
import { MentorRequests } from "../components/mentorRequests/MentorRequests";
import { SessionRequestSuccess } from "../components/sessionRequest/success/SessionRequestSuccess";
import { NotFound } from "../components/shared/404/NotFound";
import { ForgotPassword } from "../components/auth/ForgotPassword";
import { ChangePassword } from "../components/auth/ChangePassword";
import { Settings } from "../components/account/settings/Settings";
import { UserRequests } from "../components/userRequests/UserRequests";
import { UserRequestPage } from "../components/userRequests/userRequestPage/UserRequestPage";
import { Activate } from "../components/account/activate/Activate";
import { Products } from "../components/products/Products";

interface RoutesProps {}

export const Routes: React.FC<RoutesProps> = () => {
  return (
    <Switch>
      <ProtectedRoute path="/products" component={Products} exact />
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
      <ProtectedRoute path="/user/requests" component={UserRequests} exact />
      <ProtectedRoute
        path="/user/requests/:id"
        component={UserRequestPage}
        exact
      />

      <ProtectedRoute path="/mentors" component={Mentors} exact />
      <ProtectedRoute path="/profile" component={MentorProfilePrivate} exact />
      <ProtectedRoute
        path="/setings/profile"
        component={ProfileSettings}
        exact
      />
      <ProtectedRoute path="/setings" component={Settings} exact />

      <ProtectedRoute path="/dashboard" component={DashboardLayout} />

      <Route path="/login" component={Login} exact />
      <Route path="/mentor-register/:token" component={RegisterMentor} exact />
      <Route path="/admin-register/:token" component={RegisterAdmin} exact />
      <Route path="/guest-register" component={RegisterIndividual} exact />
      <Route path="/forgot-password" component={ForgotPassword} exact />
      <Route path="/change-password/:token" component={ChangePassword} exact />

      <Route path="/user/activate/:token" component={Activate} exact />
      <Redirect from="/" to="/login" exact />
      <Route component={NotFound} />
    </Switch>
  );
};
