import { makeStyles } from "@material-ui/core";
import { DeleteOutline } from "@material-ui/icons";
import MaterialTable from "material-table";
import React, { useState } from "react";
import {
  SkillsDocument,
  useDeleteSkillMutation,
  useEditSkillMutation,
  useSkillsQuery,
} from "../../../generated/graphql";
import { GeneralSnackbar } from "../../shared/generalSnackbar/GeneralSnackbar";
import { Loading } from "../../shared/loading/Loading";

const useStyles = makeStyles((theme) => ({
  icon: {
    color: theme.palette.error.light,
  },
}));

interface SkillsProps {}

export const Skills: React.FC<SkillsProps> = () => {
  const classes = useStyles();

  // State
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  // GraphQL
  const { data, loading } = useSkillsQuery();
  const [editSkill] = useEditSkillMutation();
  const [deleteSkill] = useDeleteSkillMutation();

  const handleDelete = async (id: number) => {
    const { data } = await deleteSkill({
      variables: { skillId: id },
      refetchQueries: [{ query: SkillsDocument }],
    });

    if (data?.deleteSkill.errorMsg) {
      setMessage(data.deleteSkill.errorMsg);
      setOpen(true);
    }
  };

  if (loading || !data) {
    return <Loading />;
  }

  return (
    <>
      <MaterialTable
        title="Skills"
        columns={[
          { title: "Name", field: "name" },
          {
            title: "Lowercase",
            field: "nameLowercase",
            sorting: false,
            editable: "never",
          },
          { title: "Times Used", field: "timesUsed", editable: "never" },
        ]}
        data={data?.skills.map((skill) => {
          return {
            id: skill.skill_id,
            name: skill.skill_name,
            nameLowercase: skill.skill_nameLowercase,
            timesUsed: skill.count,
          };
        })}
        actions={[
          {
            icon: () => <DeleteOutline className={classes.icon} />,
            tooltip: "Delete Skill",
            onClick: (event, rowData: any) => handleDelete(rowData.id),
          },
        ]}
        cellEditable={{
          onCellEditApproved: (newValue, oldValue, rowData, columnDef) => {
            return new Promise(async (resolve, reject) => {
              const { data } = await editSkill({
                variables: { newName: newValue, skillId: rowData.id },
                refetchQueries: [{ query: SkillsDocument }],
              });
              if (data?.editSkill) {
                resolve();
              }
              if (data?.editSkill.errorMsg) {
                reject();
                setMessage(data.editSkill.errorMsg);
                setOpen(true);
              }
              console.log(data);
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
