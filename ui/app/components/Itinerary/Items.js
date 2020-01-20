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

function AlignItemsList(props) {
  var { events } = props;
  const classes = useStyles();

  return (
    <List className={classes.root}>
      {events.map((event, index) => (
        <div key={event.order}>
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <i
                className="material-icons"
                style={{ fontSize: "30px", color: "#5865bc" }}
              >
                {event.materialIcon}
              </i>
            </ListItemAvatar>
            <ListItemText
              primary={event.title}
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    {event.activity}
                  </Typography>
                  {" — " + event.description}
                </React.Fragment>
              }
            />
          </ListItem>
          <Divider variant="inset" component="li" />
        </div>
      ))}
    </List>
  );
}
export default AlignItemsList;
