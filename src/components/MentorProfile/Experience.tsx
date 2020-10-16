import MomentUtils from "@date-io/moment";
import {
  makeStyles,
  IconButton,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  TextField,
} from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import React, { useEffect, useState } from "react";
import { GeneralCard } from "./GeneralCard";
import { WorkExperience } from "./WorkExperience";

const useStyles = makeStyles((theme) => ({
  addWorkWrapper: {
    textAlign: "center",
  },
  addWorkBtn: {},
  description: {
    width: "100%",
  },
  picker: {
    width: "100%",
  },
}));

interface ExperienceProps {
  workExperience: {
    role: string;
    company: string;
    from: string;
    to: string;
    description: string;
  }[];
  setWorkExperience: React.Dispatch<
    React.SetStateAction<
      {
        role: string;
        company: string;
        from: string;
        to: string;
        description: string;
      }[]
    >
  >;
}

export const Experience: React.FC<ExperienceProps> = ({
  workExperience,
  setWorkExperience,
}) => {
  const classes = useStyles();

  const [dialogOpen, setDialogOpen] = useState(false);

  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  const [from, setFrom] = useState<any>(new Date());
  const [to, setTo] = useState<any>(new Date());
  const [description, setDescription] = useState("");

  const handleInputChange = (event: any) => {
    switch (event.target.name) {
      case "role":
        setRole(event.target.value);
        break;
      case "company":
        setCompany(event.target.value);
        break;
      case "description":
        setDescription(event.target.value);
        break;
      default:
        break;
    }
  };

  const handleAdd = () => {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    const fromDate = new Date(from);
    const toDate = new Date(to);

    const newWorkExperience = {
      role,
      company,
      from: `${monthNames[fromDate.getMonth()]} ${fromDate.getFullYear()}`,
      to: `${monthNames[toDate.getMonth()]} ${toDate.getFullYear()}`,
      description,
    };

    setWorkExperience((old) => [...old, newWorkExperience]);

    console.log(role);
    console.log(company);
    console.log(`${monthNames[fromDate.getMonth()]} ${fromDate.getFullYear()}`);
    console.log(`${monthNames[toDate.getMonth()]} ${toDate.getFullYear()}`);
    console.log(description);
    setDialogOpen(false);
  };

  return (
    <GeneralCard title="Experience">
      {workExperience.length > 0 &&
        workExperience.map((work) => (
          <WorkExperience
            role={work.role}
            company={work.company}
            from={work.from}
            to={work.to}
            description={work.description}
          />
        ))}
      <div className={classes.addWorkWrapper}>
        <IconButton
          onClick={() => setDialogOpen(true)}
          className={classes.addWorkBtn}
          size="medium"
          color="secondary"
        >
          <Add fontSize="large" />
        </IconButton>
        <Typography variant="body2" color="textSecondary">
          Add new position
        </Typography>
      </div>
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle id="simple-dialog-title">
          Add new work position
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="off"
                variant="outlined"
                required
                fullWidth
                id="role"
                label="Role"
                name="role"
                value={role}
                onChange={handleInputChange}
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="off"
                variant="outlined"
                required
                fullWidth
                id="company"
                label="Company"
                name="company"
                value={company}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={6}>
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <DatePicker
                  className={classes.picker}
                  views={["year", "month"]}
                  label="From"
                  name="from"
                  inputVariant="outlined"
                  value={from}
                  onChange={(newDate) => setFrom(newDate)}
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs={6}>
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <DatePicker
                  className={classes.picker}
                  views={["year", "month"]}
                  label="To"
                  name="to"
                  inputVariant="outlined"
                  value={to}
                  onChange={(newDate) => setTo(newDate)}
                />
              </MuiPickersUtilsProvider>
            </Grid>
            <Grid item xs={12}>
              <TextField
                autoComplete="off"
                className={classes.description}
                id="outlined-multiline-static"
                label="Description"
                name="description"
                multiline
                rows={7}
                placeholder="Write about your position"
                variant="outlined"
                value={description}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <DialogActions>
                <Button
                  onClick={() => setDialogOpen(false)}
                  autoFocus
                  color="primary"
                >
                  Cancel
                </Button>
                <Button onClick={handleAdd} color="primary" autoFocus>
                  Add
                </Button>
              </DialogActions>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </GeneralCard>
  );
};
