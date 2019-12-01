import {makeStyles} from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(10),
    display: "flex",
    flexGrow: 1,
    flexDirection: "column",
    justifyContent: "center",
    width: "95%"
  },
  itineraryBox: {
    display: "flex",
    flexGrow: 1,
    backgroundColor: "#F6F6F6",
    padding: "2em",
    height: "565px"
  },
  itineraryContainer: {
    display: "flex",
    flexGrow: 1,
    flexDirection: "row",
    height: "400px"
  },
  purchaseContainer: {
    textAlign: "center"
  },
  purchaseItem: {
    padding: "1em"
  },
  paper: {
    height: "5em",
    padding: "5px",
    margin: "0 3px 3px 0"
  }
}));

export default useStyles;
