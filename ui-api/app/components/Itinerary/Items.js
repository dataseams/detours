import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  List,
  ListItem,
  Divider,
  ListItemText,
  ListItemAvatar,
  Typography,
  Paper
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
  const { events } = props;
  const classes = useStyles();

  return (
    <Paper style={{ height: "100%" }}>
      <List className={classes.root}>
        {events.edges.map((event, index) => (
          <div key={(index + 1) * event.node.order}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <i
                  className="material-icons"
                  style={{ fontSize: "30px", color: "#5865bc" }}
                >
                  {event.node.activity.activityType.materialIcon}
                </i>
              </ListItemAvatar>
              <ListItemText
                primary={event.node.activity.place.name}
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      className={classes.inline}
                      color="textPrimary"
                    >
                      {event.node.activity.name}
                    </Typography>
                    {" — " + event.node.activity.place.description}
                  </React.Fragment>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </div>
        ))}
      </List>
    </Paper>
  );
}
export default AlignItemsList;
