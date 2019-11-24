import clsx from "clsx";
import { makeStyles, Radio, Paper } from "@material-ui/core";

const paperStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    borderRadius: "5px",
    height: "75px",
    width: "120px",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    cursor: "pointer",
    outline: "0px auto rgba(19,124,189,.6)",
    outlineOffset: 0,
    "&:hover": {
      backgroundColor: "#F5F5F5"
    }
  },
  paperSelected: {
    borderRadius: "5px",
    height: "75px",
    width: "120px",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    cursor: "pointer",
    outline: "0px auto rgba(19,124,189,.6)",
    outlineOffset: 0,
    backgroundColor: "#F5F5F5",
    "&:hover": {
      backgroundColor: "#F5F5F5"
    }
  },
  q: {
    fontSize: "1.125em",
    paddingBottom: theme.spacing(2)
  },
  cb: {
    paddingLeft: theme.spacing(1)
  }
}));

function StyledPaper(props) {
  const classes = paperStyles();

  return (
    <Paper
      className={classes.paper}
      disableRipple
      color="default"
      component={Radio}
      checkedIcon={<span className={clsx(classes.paperSelected)} />}
      icon={<span className={clsx(classes.paper)} />}
      {...props}
    />
  );
}

export { StyledPaper, paperStyles };
