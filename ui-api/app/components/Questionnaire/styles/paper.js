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
    padding: 0,
    margin: "10px",
    "&:hover": {
      backgroundColor: "#5865bc",
      opacity: 0.6
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
    backgroundColor: "#5865bc",
    opacity: 0.8,
    padding: 0,
    "&:hover": {
      backgroundColor: "#5865bc",
      opacity: 0.8
    }
  },
  q: {
    fontSize: "1.125em",
    paddingBottom: theme.spacing(2)
  },
  cb: {
    paddingLeft: theme.spacing(1)
  },
  text: {
    fontSize: "16px",
    textTransform: "capitalize",
    color: "black"
  },
  textSelected: {
    fontSize: "16px",
    textTransform: "capitalize",
    color: "white"
  }
}));

function StyledPaper(props) {
  const classes = paperStyles();
  const { content } = props;

  return (
    <Paper
      className={classes.paper}
      disableRipple
      color="default"
      component={Radio}
      checkedIcon={
        <span className={clsx(classes.textSelected, classes.paperSelected)}>
          <div>{content.name}</div>
          <div>{content.id}</div>
        </span>
      }
      icon={
        <span className={clsx(classes.text)}>
          <div>{content.name}</div>
          <div>{content.id}</div>
        </span>
      }
      {...props}
    />
  );
}

export { StyledPaper, paperStyles };
