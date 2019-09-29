import "date-fns";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  KeyboardTimePicker
} from "@material-ui/pickers";

function TravelDates() {
    const [arrivalDate, setArrivalDate] = React.useState(new Date());
    const [returnDate, setReturnDate] = React.useState(new Date());
    const [arrivalTime, setArrivalTime] = React.useState(new Date());
    const [returnTime, setReturnTime] = React.useState(new Date());

    const handleArrivalDateChange = date => {
      setArrivalDate(date);
    };
    const handleReturnDateChange = date => {
      setReturnDate(date);
    };
    const handleArrivalTimeChange = date => {
      setArrivalTime(date);
    };
    const handleReturnTimeChange = date => {
      setReturnTime(date);
    };

    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <KeyboardDatePicker
              disableToolbar
              margin="normal"
              variant="inline"
              id="arrival-date-picker"
              label="Arrivale date"
              format="MM/dd/yyyy"
              value={arrivalDate}
              onChange={handleArrivalDateChange}
            />
          </Grid>
          <Grid item xs={6}>
            <KeyboardDatePicker
              disableToolbar
              margin="normal"
              variant="inline"
              id="return-date-picker"
              label="Return date"
              format="MM/dd/yyyy"
              value={returnDate}
              onChange={handleReturnDateChange}
            />
          </Grid>
          <Grid item xs={6}>
            <KeyboardTimePicker
              disableToolbar
              margin="normal"
              variant="inline"
              id="arrival-time-picker"
              label="Arrival time"
              value={arrivalTime}
              onChange={handleArrivalTimeChange}
            />
          </Grid>
          <Grid item xs={6}>
            <KeyboardTimePicker
              disableToolbar
              margin="normal"
              variant="inline"
              id="return-time-picker"
              label="Return time"
              value={returnTime}
              onChange={handleReturnTimeChange}
              KeyboardButtonProps={{
                "aria-label": "change time"
              }}
            />
          </Grid>
        </Grid>
      </MuiPickersUtilsProvider>
    );
  }

export default TravelDates;
