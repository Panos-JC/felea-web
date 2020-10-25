import { Card } from "@material-ui/core";
import React from "react";
import { PageTitle } from "../../pageTitle/PageTitle";
import { MentorTable } from "./MentorTable";

interface MentorsProps {}

export const Mentors: React.FC<MentorsProps> = () => {
  return (
    <>
      <PageTitle title="Mentors" action="Add New Mentor" />
      <Card>
        <MentorTable />
      </Card>
    </>
  );
};
