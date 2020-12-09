import { makeStyles, Typography, IconButton } from "@material-ui/core";
import { Edit, Delete } from "@material-ui/icons";
import moment from "moment";
import React, { useState } from "react";
import {
  CertificateFieldsFragment,
  CertificatesDocument,
  useDeleteCertificateMutation,
} from "../../../../generated/graphql";
import { EditCertificate } from "./editCertificate/EditCertificate";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiButtonBase-root": {
      display: "none",
    },
    "&:hover": {
      "& .MuiButtonBase-root": {
        display: "inline-flex",
      },
    },
  },
  titleWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  editIcon: {
    "&:hover": {
      color: theme.palette.primary.light,
    },
  },
  deleteIcon: {
    "&:hover": {
      color: theme.palette.error.light,
    },
  },
  title: {
    lineHeight: 2,
    fontSize: 16,
    fontWeight: 600,
  },
  school: {
    fontSize: 14,
  },
  date: {
    fontSize: 12,
    color: theme.palette.text.secondary,
    marginBottom: theme.spacing(1),
  },
  message: {
    fontSize: 15,
    marginBottom: theme.spacing(1),
  },
}));

interface SuccessStoryProps {
  mentorId: number;
  data: CertificateFieldsFragment;
}

export const SuccessStory: React.FC<SuccessStoryProps> = ({
  data,
  mentorId,
}) => {
  const classes = useStyles();

  // State
  const [edit, setEdit] = useState<boolean>(false);

  const [deleteCertificate] = useDeleteCertificateMutation();

  const handleEdit = () => {
    setEdit(!edit);
  };

  const handleDelete = async () => {
    const { data: deleteCertificateData } = await deleteCertificate({
      variables: { id: data.id },
      refetchQueries: [
        { query: CertificatesDocument, variables: { mentorId } },
      ],
    });

    if (deleteCertificateData?.deleteCertificate) {
      setEdit(false);
    }
  };

  if (edit) {
    return <EditCertificate setEdit={setEdit} values={data} />;
  }

  return (
    <div className={classes.root}>
      <div className={classes.titleWrapper}>
        <Typography className={classes.title}>{data.title}</Typography>
        <div>
          <IconButton
            onClick={handleEdit}
            className={classes.editIcon}
            size="small"
          >
            <Edit />
          </IconButton>
          <IconButton
            onClick={handleDelete}
            className={classes.deleteIcon}
            size="small"
          >
            <Delete />
          </IconButton>
        </div>
      </div>

      <Typography className={classes.school}>{data.organization}</Typography>
      <Typography className={classes.date}>
        {moment(data.date).format("MMMM YYYY")}
      </Typography>
      <Typography className={classes.message}>{data.description}</Typography>
    </div>
  );
};
