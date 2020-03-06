import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles, createStyles } from "@material-ui/core";

const useStyles = makeStyles(() =>
  createStyles({
    root: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
    },
  }),
);

export const LoadingScreen: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CircularProgress />
    </div>
  );
};
