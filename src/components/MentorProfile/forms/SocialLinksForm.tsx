import {
  Button,
  Card,
  InputAdornment,
  makeStyles,
  TextField,
  Typography,
} from "@material-ui/core";
import { Language } from "@material-ui/icons";
import React from "react";
import { useForm } from "react-hook-form";
import {
  RiLinkedinBoxLine,
  RiMediumLine,
  RiFacebookBoxLine,
  RiTwitterLine,
  RiInstagramLine,
} from "react-icons/ri";
import {
  MeDocument,
  useMeQuery,
  useSetMentorLinksMutation,
} from "../../../generated/graphql";
import { Loading } from "../../loading/Loading";

const useStyles = makeStyles((theme) => ({
  settings: {
    padding: 20,
  },
  input: {
    width: "100%",
    marginTop: theme.spacing(2),
  },
  icon: {
    color: theme.palette.text.secondary,
  },
}));

type Inputs = {
  linkedin: string;
  medium: string;
  facebook: string;
  twitter: string;
  instagram: string;
  website: string;
};

interface SocialLinksFormProps {}

export const SocialLinksForm: React.FC<SocialLinksFormProps> = () => {
  const classes = useStyles();

  const { data, loading: meLoading } = useMeQuery();
  const [setMentorLinks, { loading }] = useSetMentorLinksMutation();

  const { register, handleSubmit } = useForm<Inputs>();

  const onSubmit = async (formData: Inputs) => {
    console.log(formData);
    await setMentorLinks({
      variables: { links: formData },
      refetchQueries: [{ query: MeDocument }],
    });
  };

  if (meLoading) return <Loading />;

  return (
    <Card className={classes.settings}>
      <Typography variant="h5" component="h2">
        Social Links
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          inputRef={register}
          className={classes.input}
          label="Website"
          name="website"
          variant="outlined"
          size="small"
          placeholder="https://www.felea.org/"
          defaultValue={data?.me?.mentor?.website}
          autoComplete="off"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Language className={classes.icon} />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          inputRef={register}
          className={classes.input}
          label="LinkedIn"
          name="linkedin"
          variant="outlined"
          size="small"
          placeholder="https://www.linkedin.com/"
          defaultValue={data?.me?.mentor?.linkedin}
          autoComplete="off"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <RiLinkedinBoxLine size="1.5rem" className={classes.icon} />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          inputRef={register}
          className={classes.input}
          label="Medium"
          name="medium"
          variant="outlined"
          size="small"
          placeholder="https://www.medium.com/"
          defaultValue={data?.me?.mentor?.medium}
          autoComplete="off"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <RiMediumLine size="1.5rem" className={classes.icon} />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          inputRef={register}
          className={classes.input}
          label="Facebook"
          name="facebook"
          variant="outlined"
          size="small"
          placeholder="https://www.facebook.com/"
          defaultValue={data?.me?.mentor?.facebook}
          autoComplete="off"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <RiFacebookBoxLine size="1.5rem" className={classes.icon} />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          inputRef={register}
          className={classes.input}
          label="Twitter"
          name="twitter"
          variant="outlined"
          size="small"
          placeholder="https://www.twitter.com/"
          defaultValue={data?.me?.mentor?.twitter}
          autoComplete="off"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <RiTwitterLine size="1.5rem" className={classes.icon} />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          inputRef={register}
          className={classes.input}
          label="Instagram"
          name="instagram"
          variant="outlined"
          size="small"
          placeholder="https://www.instagram.com/"
          defaultValue={data?.me?.mentor?.instagram}
          autoComplete="off"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <RiInstagramLine size="1.5rem" className={classes.icon} />
              </InputAdornment>
            ),
          }}
        />
        <Button
          style={{ marginTop: 20 }}
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
          disableElevation
        >
          Save
        </Button>
      </form>
    </Card>
  );
};
