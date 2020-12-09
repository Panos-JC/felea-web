import {
  Avatar,
  Button,
  Card,
  Grid,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { CloudUpload } from "@material-ui/icons";
import React, { useState } from "react";
import { Layout } from "../../shared/layout/Layout";
import { SettingsForm } from "../forms/SettingsForm";
import { SocialLinksForm } from "../forms/SocialLinksForm";
import axios from "axios";
import { Loading } from "../../shared/loading/Loading";
import {
  IsProfileCompleteDocument,
  MeDocument,
  useAddAvatarMutation,
  useMeQuery,
} from "../../../generated/graphql";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: 20,
  },
  infoCard: {
    padding: 20,
  },
  info: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  avatarTitle: {
    fontSize: "75%",
  },
  avatarBody: {
    fontSize: "11px",
    lineHeight: 1.5,
    color: theme.palette.text.secondary,
  },
  button: { width: "100%" },
  uploadInput: {
    display: "none",
  },
}));

interface ProfileSettingsProps {}

export const ProfileSettings: React.FC<ProfileSettingsProps> = () => {
  const classes = useStyles();

  const [loading, setLoading] = useState(false);

  const { data: meData, loading: meLoading } = useMeQuery();
  const [addAvatar] = useAddAvatarMutation();

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("file", e.target.files![0]);
    formData.append("upload_preset", "qw0fx1xw");

    const cloudName = "dhhvqnkvr";

    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudName}/upload`,
      formData
    );

    const { data } = await addAvatar({
      variables: {
        avatarUrl: response.data.secure_url,
        publicId: response.data.public_id,
      },
      refetchQueries: [
        { query: MeDocument },
        { query: IsProfileCompleteDocument },
      ],
    });

    if (data?.addAvatar) {
      setLoading(false);
    }
  };

  return (
    <Layout maxWidth="md">
      <Grid container spacing={2} className={classes.container}>
        <Grid item xs={4}>
          <Card className={classes.infoCard}>
            {meLoading && <Loading />}
            {meData && meData.me && (
              <>
                <div className={classes.info}>
                  <Avatar
                    className={classes.avatar}
                    src={meData.me.avatar || ""}
                  />
                  <Typography
                    className={classes.avatarTitle}
                    variant="subtitle2"
                  >
                    Change avatar
                  </Typography>
                  <Typography className={classes.avatarBody} variant="body2">
                    Images must be .jpg or .png with maximum size of 10MB.
                  </Typography>
                </div>
                <input
                  type="file"
                  id="upload-avatar"
                  onChange={handleUpload}
                  className={classes.uploadInput}
                />
                <label htmlFor="upload-avatar">
                  <Button
                    color="secondary"
                    variant="contained"
                    size="small"
                    component="span"
                    disableElevation
                    className={classes.button}
                    startIcon={<CloudUpload />}
                    disabled={loading}
                  >
                    Upload Image
                  </Button>
                </label>
              </>
            )}
          </Card>
        </Grid>
        <Grid item xs={8}>
          <SettingsForm />
          <SocialLinksForm />
        </Grid>
      </Grid>
    </Layout>
  );
};
