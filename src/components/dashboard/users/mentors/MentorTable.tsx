import { Avatar, Link, makeStyles } from "@material-ui/core";
import { fade } from "@material-ui/core/styles";
import MaterialTable from "material-table";
import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { useAllMentorsQuery } from "../../../../generated/graphql";
import { Loading } from "../../../shared/loading/Loading";

const useStyles = makeStyles((theme) => ({
  nameCell: {
    display: "flex",
    alignItems: "center",
  },
  avatar: {
    height: 42,
    width: 42,
    marginRight: theme.spacing(1),
  },
  warn: {
    background: fade(theme.palette.error.light, 0.4),
    color: theme.palette.error.dark,
  },
  success: {
    background: fade(theme.palette.success.light, 0.4),
    color: theme.palette.success.dark,
  },
  link: {
    fontSize: 14,
  },
  email: {
    fontSize: "0.875rem",
    color: theme.palette.text.secondary,
  },
}));

interface MentorTableProps {}

export const MentorTable: React.FC<MentorTableProps> = () => {
  const classes = useStyles();

  const { data, loading } = useAllMentorsQuery();

  if (loading || !data) {
    return <Loading />;
  }

  return (
    <MaterialTable
      title=""
      columns={[
        {
          title: "Name",
          render: (rowData) => (
            <div className={classes.nameCell}>
              <Avatar className={classes.avatar} src={rowData.avatar || ""} />
              <div>
                <Link
                  className={classes.link}
                  color="inherit"
                  component={RouterLink}
                  to={`/mentor/${rowData.id}`}
                  variant="h6"
                >
                  {`${rowData.firstName} ${rowData.lastName}`}
                </Link>
                <div className={classes.email}>{rowData.email}</div>
              </div>
            </div>
          ),
        },
        {
          title: "Profile Complete",
          field: "profileComplete",
        },
        {
          title: "Email Active",
          field: "emailActive",
        },
      ]}
      data={data.allMentors.map((mentor) => {
        return {
          id: mentor.mentor.id,
          firstName: mentor.mentor.firstName,
          lastName: mentor.mentor.lastName,
          email: mentor.mentor.user.email,
          avatar: mentor.mentor.user.avatar,
          profileComplete: mentor.mentor.profileComplete,
          emailActive: mentor.mentor.user.activated,
          sessions: mentor.sessions,
        };
      })}
    />
  );
};
