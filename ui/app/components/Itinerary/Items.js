import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  List,
  ListItem,
  Divider,
  ListItemText,
  ListItemAvatar,
  Typography
} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
   margin: "0 3px 0 0"
  },
  inline: {
    display: "inline"
  }
}));

export default function AlignItemsList() {
  const classes = useStyles();

  return (
    <List className={classes.root}>
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <i
            className="material-icons"
            style={{ fontSize: "30px", color: "#5865bc" }}
          >
            hotel
          </i>
        </ListItemAvatar>
        <ListItemText
          primary="Maison natale Bernard Buffet"
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                Breakfast
              </Typography>
              {" — A historical landmark with breakfast experience."}
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <i
            className="material-icons"
            style={{ fontSize: "30px", color: "#5865bc" }}
          >
            directions_bike
          </i>
        </ListItemAvatar>
        <ListItemText
          primary="Holland Bikes Norte Dame"
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                Biking
              </Typography>
              {" — A self-guided biking tour in the city."}
            </React.Fragment>
          }
        />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem alignItems="flex-start">
        <ListItemAvatar>
          <i
            className="material-icons"
            style={{ fontSize: "30px", color: "#5865bc" }}
          >
            restaurant
          </i>
        </ListItemAvatar>
        <ListItemText
          primary="Le Souffle"
          secondary={
            <React.Fragment>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                Lunch
              </Typography>
              {
                " — A local favorite, known for its generosity and tasty souffles."
              }
            </React.Fragment>
          }
        />
      </ListItem>
    </List>
  );
}
