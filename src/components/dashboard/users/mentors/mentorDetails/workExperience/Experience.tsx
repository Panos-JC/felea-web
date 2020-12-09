import React from "react";
import { useWorkExperiencesQuery } from "../../../../../../generated/graphql";
import { GeneralCard } from "../../../../../shared/generalCard/GeneralCard";
import { WorkExperience } from "./WorkExperience";

interface ExperienceProps {
  id: number;
}

export const Experience: React.FC<ExperienceProps> = ({ id }) => {
  const { data } = useWorkExperiencesQuery({
    variables: { mentorId: id },
  });
  return (
    <GeneralCard title="Work Experience">
      {data?.workExperiences.data?.map((experience) => (
        <WorkExperience
          mentorId={id}
          key={experience.id}
          id={experience.id}
          role={experience.role}
          company={experience.companyName}
          from={experience.from}
          to={experience.untill}
          description={experience.description}
          industries={experience.industries!}
        />
      ))}
    </GeneralCard>
  );
};
