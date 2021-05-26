import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Typography,
  Paper,
} from "@material-ui/core";
import { transparent } from "material-ui/styles/colors";

const useMobileStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
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
  timelineItem: {
    "&::before": {
      content: "none",
    },
  },
  timelineConnector: {
    backgroundColor: transparent,
    marginRight: "28px",
    border: `1px dashed ${theme.palette.primary.main}`,
  },
  timelineContent: {
    padding: "0",
  },
}));

function ItineraryItem(props) {
  const { index, event, type, listLength } = props;
  const classes = useMobileStyles();

  return (
    <Paper style={{ height: "100%", display: `${type}` }}>
      <List className={classes.root}>
        <div key={(index + 1) * event.node.order} className={classes.listItem}>
          <ListItem>
            <TimelineItem className={classes.timelineItem}>
              <TimelineSeparator>
                <ListItemAvatar>
                  <i className={`material-icons ${classes.icon}`}>
                    {event.node.activity.activityType.materialIcon}
                  </i>
                </ListItemAvatar>
                {index + 1 !== listLength ? (
                  <TimelineConnector className={classes.timelineConnector} />
                ) : (
                  ""
                )}
              </TimelineSeparator>

              <TimelineContent className={classes.timelineContent}>
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
              </TimelineContent>
            </TimelineItem>
          </ListItem>
        </div>
      </List>
    </Paper>
  );
}
export default ItineraryItem;
