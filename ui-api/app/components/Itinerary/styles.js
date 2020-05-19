import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(10),
    display: "flex",
    flexGrow: 1,
    flexDirection: "column",
    justifyContent: "center"
  },
  itineraryBox: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    backgroundColor: "#F6F6F6",
    padding: "2em"
  },
  itineraryContainer: {
    display: "flex",
    flexGrow: 1,
    flexDirection: "row",
    height: "400px"
  },
  mapContainer: {
    display: "flex",
    flexGrow: 1,
    flexDirection: "row",
    padding: "0 0 0 0.25em"
  },
  purchaseContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  purchaseItem: {
    padding: "1em"
  },
  paper: {
    height: "5em",
    padding: "5px",
    margin: "0 3px 3px 0"
  },
  divider: {
    height: "2px",
    backgroundColor: "#5865bc",
    margin: "1em"
  },
  purchaseSubContainer: {
    width: "90px",
    padding: "0px",
    margin: "0px"
  }
}));

export default useStyles;
