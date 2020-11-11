import { makeStyles, fade } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  card: {
    marginTop: theme.spacing(2),
    padding: theme.spacing(2),
  },
  avatar: {
    width: 60,
    height: 60,
    marginRight: theme.spacing(2),
  },
  head: {
    display: "flex",
    alignItems: "center",
  },
  titles: {
    flexGrow: 1,
  },
  name: {
    fontSize: 16,
    lineHeight: 1.2,
  },
  headline: {
    fontSize: "0.875rem",
    color: theme.palette.text.secondary,
    fontWeight: 500,
    lineHeight: 1.2,
  },
  date: {
    fontSize: "0.75rem",
    color: theme.palette.text.secondary,
    lineHeight: 1.2,
  },
  chipSuccess: {
    color: theme.palette.primary.dark,
    backgroundColor: fade(theme.palette.primary.light, 0.5),
  },
  chipWarning: {
    color: theme.palette.warning.dark,
    backgroundColor: fade(theme.palette.warning.light, 0.5),
  },
  title: {
    marginBottom: theme.spacing(1),
  },
  message: {
    marginBottom: theme.spacing(2),
  },
  infoWrapper: {
    display: "flex",
    flexDirection: "column",
  },
  info: {
    marginBottom: theme.spacing(1),
  },
  declineBtn: {
    backgroundColor: theme.palette.error.main,
    color: theme.palette.error.contrastText,
    marginLeft: theme.spacing(1),
    "&:hover": {
      backgroundColor: theme.palette.error.dark,
    },
  },
  actions: {
    marginTop: theme.spacing(2),
  },
}));

export default useStyles;
