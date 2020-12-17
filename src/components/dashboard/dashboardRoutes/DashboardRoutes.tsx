import React from "react";
import { ProtectedRoute } from "../../../router/ProtectedRoute";
import { SessionPage } from "../sessions/sessionPage/SessionPage";
import { Sessions } from "../sessions/Sessions";
import { Admins } from "../users/admins/Admins";
import { Companies } from "../users/companies/Companies";
import { NewCompany } from "../users/companies/newCompany/NewCompany";
import { Individuals } from "../users/individuals/Individuals";
import { Mentors } from "../users/mentors/Mentors";
import { NewMentor } from "../users/mentors/newMentor/NewMentor";
import { Settings } from "../settings/Settings";
import { NewAdmin } from "../users/admins/newAdmin/NewAdmin";
import { EditMentorDetails } from "../users/mentors/mentorDetails/EditMentorDetails";
import { IndividualPage } from "../users/individuals/individualPage/IndividualPage";
import { MentorDetails } from "../users/mentors/mentorDetails/MentorDetails";
import { CompanyPage } from "../users/companies/companyPage/CompanyPage";
import { Skills } from "../tags/Skills";
import { Industries } from "../tags/Industries";

interface DashboardRoutesProps {}

export const DashboardRoutes: React.FC<DashboardRoutesProps> = () => {
  return (
    <>
      <ProtectedRoute path="/dashboard/settings" component={Settings} exact />
      <ProtectedRoute path="/dashboard/tags/skills" component={Skills} exact />
      <ProtectedRoute
        path="/dashboard/tags/industries"
        component={Industries}
        exact
      />
      <ProtectedRoute
        path="/dashboard/users/mentor/:id/edit"
        component={EditMentorDetails}
        exact
      />
      <ProtectedRoute
        path="/dashboard/users/mentor/:id/"
        component={MentorDetails}
        exact
      />
      <ProtectedRoute
        path="/dashboard/users/mentors"
        component={Mentors}
        exact
      />
      <ProtectedRoute
        path="/dashboard/users/mentors/new"
        component={NewMentor}
        exact
      />
      <ProtectedRoute
        path="/dashboard/users/admins/new"
        component={NewAdmin}
        exact
      />
      <ProtectedRoute
        path="/dashboard/users/individuals"
        component={Individuals}
        exact
      />
      <ProtectedRoute
        path="/dashboard/users/individual/:id"
        component={IndividualPage}
        exact
      />
      <ProtectedRoute path="/dashboard/users/admins" component={Admins} exact />
      <ProtectedRoute
        path="/dashboard/users/companies"
        component={Companies}
        exact
      />
      <ProtectedRoute
        path="/dashboard/users/company/:id"
        component={CompanyPage}
        exact
      />
      <ProtectedRoute
        path="/dashboard/users/companies/new"
        component={NewCompany}
        exact
      />
      <ProtectedRoute path="/dashboard/sessions" component={Sessions} exact />
      <ProtectedRoute
        path="/dashboard/sessions/:id"
        component={SessionPage}
        exact
      />
    </>
  );
};
