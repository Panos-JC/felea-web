import {
  makeStyles,
  Card,
  Avatar,
  Typography,
  Button,
} from "@material-ui/core";
import { CloudUpload } from "@material-ui/icons";
import React, { useState } from "react";
import {
  GetAvatarDocument,
  useAddAvatarByAdminMutation,
  useGetAvatarQuery,
} from "../../../../../../generated/graphql";

const useStyles = makeStyles((theme) => ({
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

interface UploadAvatarProps {
  id: number;
}

export const UploadAvatar: React.FC<UploadAvatarProps> = ({ id }) => {
  const classes = useStyles();

  const [loading, setLoading] = useState(false);

  const { data } = useGetAvatarQuery({ variables: { mentorId: id } });
  const [addAvatar, { loading: avatarLoading }] = useAddAvatarByAdminMutation();

  // const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const formData = new FormData();
  //   formData.append("file", e.target.files![0]);
  //   formData.append("upload_preset", "qw0fx1xw");

  //   const cloudName = "dhhvqnkvr";

  //   const response = await axios.post(
  //     `https://api.cloudinary.com/v1_1/${cloudName}/upload`,
  //     formData
  //   );

  //   await addAvatar({
  //     variables: {
  //       avatarUrl: response.data.secure_url,
  //       publicId: response.data.public_id,
  //       mentorId: id,
  //     },
  //     refetchQueries: [
  //       { query: GetAvatarDocument, variables: { mentorId: id } },
  //     ],
  //   });

  //   console.log(response.data);
  // };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoading(true);

    const reader = new FileReader();
    if (e.target.files) {
      reader.readAsDataURL(e.target.files[0]);
      reader.onloadend = async () => {
        console.log(reader.result);
        const photo = String(reader.result);
        const { data, errors } = await addAvatar({
          variables: { photo, mentorId: id },
          refetchQueries: [
            { query: GetAvatarDocument, variables: { mentorId: id } },
          ],
        });
        // console.log(data);
        if (data?.addAvatarByAdmin) {
          setLoading(false);
        }
        if (errors) {
          console.log(errors);
        }
      };
      reader.onerror = () => {
        console.error("AHHHHHHHH!!");
        setLoading(false);
      };
    }
  };

  return (
    <Card className={classes.infoCard}>
      <div className={classes.info}>
        <Avatar className={classes.avatar} src={data?.getAvatar.result || ""} />
        <Typography className={classes.avatarTitle} variant="subtitle2">
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
          disabled={avatarLoading || loading}
          className={classes.button}
          startIcon={<CloudUpload />}
        >
          Upload Image
        </Button>
      </label>
    </Card>
  );
};
