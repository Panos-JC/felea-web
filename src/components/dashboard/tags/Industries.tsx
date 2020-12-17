import MaterialTable from "material-table";
import React from "react";

interface IndustriesProps {}

export const Industries: React.FC<IndustriesProps> = () => {
  return (
    <MaterialTable
      title="Industries"
      columns={[
        { title: "Name", field: "name" },
        { title: "Slug", field: "nameLowercase" },
        { title: "Times Used", field: "timesUsed" },
      ]}
      data={[]}
    />
  );
};
