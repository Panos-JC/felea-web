import { makeStyles, Typography, IconButton } from "@material-ui/core";
import { Edit, Delete } from "@material-ui/icons";
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

interface CertificateProps {
  values: CertificateFieldsFragment;
}

export const Certificate: React.FC<CertificateProps> = ({ values }) => {
  const classes = useStyles();

  // State
  const [edit, setEdit] = useState<boolean>(false);

  const [deleteCertificate] = useDeleteCertificateMutation();

  const handleEdit = () => {
    setEdit(!edit);
  };

  const handleDelete = async () => {
    const { data } = await deleteCertificate({
      variables: { id: values.id },
      refetchQueries: [{ query: CertificatesDocument }],
    });

    if (data?.deleteCertificate) {
      setEdit(false);
    }
  };

  if (edit) {
    return <EditCertificate setEdit={setEdit} values={values} />;
  }

  return (
    <div className={classes.root}>
      <div className={classes.titleWrapper}>
        <Typography className={classes.title}>{values.title}</Typography>
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

      <Typography className={classes.school}>{values.organization}</Typography>
      <Typography className={classes.date}>{values.date}</Typography>
      <Typography className={classes.message}>{values.description}</Typography>
    </div>
  );
};
