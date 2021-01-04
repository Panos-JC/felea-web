import MaterialTable from "material-table";
import React, { useState } from "react";
import {
  IndustriesDocument,
  useEditIndustryMutation,
  useIndustriesQuery,
} from "../../../generated/graphql";
import { GeneralSnackbar } from "../../shared/generalSnackbar/GeneralSnackbar";
import { Loading } from "../../shared/loading/Loading";

interface IndustriesProps {}

export const Industries: React.FC<IndustriesProps> = () => {
  // State
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  // GraphQL
  const { data, loading } = useIndustriesQuery();
  const [editIndustry] = useEditIndustryMutation();

  if (loading || !data) {
    return <Loading />;
  }

  return (
    <>
      <MaterialTable
        title="Industries"
        columns={[
          { title: "Name", field: "name" },
          { title: "Lowercase", field: "nameLowercase", editable: "never" },
          { title: "Times Used", field: "timesUsed", editable: "never" },
        ]}
        data={data.industries.map((industry) => {
          return {
            id: industry.id,
            name: industry.name,
            nameLowercase: industry.name_lowercase,
            timesUsed: industry.count,
          };
        })}
        cellEditable={{
          onCellEditApproved: (newValue, oldValue, rowData, columnDef) => {
            return new Promise(async (resolve, reject) => {
              const { data } = await editIndustry({
                variables: { newName: newValue, industryId: rowData.id },
                refetchQueries: [{ query: IndustriesDocument }],
              });
              if (data?.editIndustry) {
                resolve();
              }

              if (data?.editIndustry.errorMsg) {
                reject();
                setMessage(data.editIndustry.errorMsg);
                setOpen(true);
              }
              console.log(rowData);
              console.log(newValue);
            });
          },
        }}
        options={{
          draggable: false,
          emptyRowsWhenPaging: false,
          pageSize: 10,
          pageSizeOptions: [10, 20],
          actionsColumnIndex: -1,
        }}
      />
      <GeneralSnackbar
        open={open}
        setOpen={setOpen}
        message={message}
        type="error"
      />
    </>
  );
};
