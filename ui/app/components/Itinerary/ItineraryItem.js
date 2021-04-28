import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Typography,
  Paper,
} from "@material-ui/core";

const useMobileStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing(1),
  },
  inline: {
    display: "inline",
  },
  icon: {
    color: theme.palette.primary.main,
  },
  listItem: {
    "&:hover": {
      backgroundColor: theme.palette.secondary.main,
    },
  },
}));

function ItineraryItem(props) {
  const { index, event } = props;
  const classes = useMobileStyles();

  return (
    <Paper style={{ height: "100%" }}>
      <List className={classes.root}>
        <div key={(index + 1) * event.node.order} className={classes.listItem}>
          <ListItem alignItems="flex-start" divider={true}>
            <ListItemAvatar>
              <i className={`material-icons ${classes.icon}`}>
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
        </div>
      </List>
    </Paper>
  );
}
export default ItineraryItem;
