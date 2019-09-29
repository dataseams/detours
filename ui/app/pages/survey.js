import "date-fns";
import Layout from "../components/MainLayout";
import React from "react";
import clsx from "clsx";
import Select from "react-select";
import Button from "@material-ui/core/Button";
import { makeStyles, RadioGroup, Radio } from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  KeyboardTimePicker
} from "@material-ui/pickers";

// my questions.json
let questions = [
  {
    id: 0,
    desc: "Which city do you want to travel to?"
  },
  {
    id: 1,
    desc: "When are you planning to take your vacation?"
  },
  {
    id: 2,
    desc: "What occasion are you celebrating?"
  },
  {
    id: 3,
    desc: "What is your age and gender?"
  },
  {
    id: 4,
    desc: "Who are you travelling with?"
  },
  {
    id: 5,
    desc: "Have you travelled to this location before?"
  },
  {
    id: 6,
    desc: "What do you like to do when you travel?"
  },
  {
    id: 7,
    desc: "Food & beverages"
  }
];

const cityOptions = [
  { value: "Paris", label: "Paris, France" },
  { value: "SF", label: "San Francisco, CA" },
  { value: "LA", label: "Los Angeles, CA" },
  { value: "Habana", label: "Habana, Cuba" },
  { value: "Other", label: "Other" }
];

const useStyles = makeStyles(theme => ({
  nextButton: {
    margin: theme.spacing(1),
    minWidth: "20%",
    backgroundColor: "#5865bc",
    color: "white",
    "&:hover": {
      backgroundColor: "#5865bc",
      opacity: 0.7
    }
  },

  backButton: {
    margin: theme.spacing(1),
    minWidth: "20%",
    backgroundColor: "white",
    "&:hover": {
      backgroundColor: "white",
      opacity: 0.7
    }
  }
}));


const radioStyles = makeStyles({
  root: {
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  icon: {
    borderRadius: '50%',
    width: 16,
    height: 16,
    boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
    backgroundColor: '#f5f8fa',
    backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.8),hsla(0,0%,100%,0))',
    '$root.Mui-focusVisible &': {
      outline: '2px auto rgba(19,124,189,.6)',
      outlineOffset: 2,
    },
    'input:hover ~ &': {
      backgroundColor: '#ebf1f5',
    },
    'input:disabled ~ &': {
      boxShadow: 'none',
      background: 'rgba(206,217,224,.5)',
    },
  },
  checkedIcon: {
    backgroundColor: '#606DC3',
    backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
    '&:before': {
      display: 'block',
      width: 16,
      height: 16,
      backgroundImage: 'radial-gradient(#fff,#fff 28%,transparent 32%)',
      content: '""',
    },
    'input:hover ~ &': {
      backgroundColor: '#106ba3',
    },
  },
});


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

function StyledRadio(props) {
  const classes = radioStyles();

  return (
    <Radio
      className={classes.root}
      disableRipple
      color="default"
      checkedIcon={<span className={clsx(classes.icon, classes.checkedIcon)} />}
      icon={<span className={classes.icon} />}
      {...props}
    />
  );
}

function Occasion() {
  let occasions = [
    { label: "Honeymoon", value: "Honeymoon" },
    { label: "Babymoon", value: "Babymoon" },
    { label: "Anniversary", value: "Anniversary" },
    { label: "Weekend getaway", value: "Weekend getaway" },
    { label: "Business trip", value: "Business trip" },
    { label: "Trip with friends", value: "Trip with friends" },
    { label: "Birthday", value: "Birthday" },
    { label: "Family vacation", value: "Family vacation" },
    { label: "Other", value: "Other" }
  ];

  return (
    <RadioGroup defaultValue="Honeymoon">
      {occasions.map((choice, index) => (
        <FormControlLabel
          key={choice.value}
          value={choice.value}
          control={<StyledRadio />}
          label={choice.label}
        />
      ))}
    </RadioGroup>
  );
}

function QuestionComp(props) {
  questions = props.questions;
  const question = questions ? questions[props.index] : null;

  var comp = {
    0: (
      <div>
        <span>STEP 1/15</span>
        <div>
          <h1>{question.desc}</h1>
          <Select
            placeholder="Type or select..."
            options={cityOptions}
          ></Select>
        </div>
      </div>
    ),
    1: (
      <div>
        <span>STEP 2/15</span>
        <div>
          <h1>{question.desc}</h1>
          <TravelDates />
        </div>
      </div>
    ),
    2: (
      <div>
        <span>STEP 3/15</span>
        <div>
          <h1>{question.desc}</h1>
          <Occasion />
        </div>
      </div>
    ),
    3: (
      <div>
        <span>STEP 4/15</span>
        <div>
          <h1>{question.desc}</h1>
        </div>
      </div>
    ),
    4: (
      <div>
        <span>STEP 5/15</span>
        <div>
          <h1>{question.desc}</h1>
        </div>
      </div>
    ),
    5: (
      <div>
        <span>STEP 6/15</span>
        <div>
          <h1>{question.desc}</h1>
        </div>
      </div>
    ),
    6: (
      <div>
        <span>STEP 7/15</span>
        <div>
          <h1>{question.desc}</h1>
        </div>
      </div>
    ),
    7: (
      <div>
        <span>STEP 8/15</span>
        <div>
          <h1>{question.desc}</h1>
        </div>
      </div>
    )
  };

  return comp[props.index];
}

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      index: 1,
      disabledNext: false,
      disabledBack: true
    };
  }

  toggleBack(e) {
    let index = this.state.index - 1;
    let disabledBack = index === 0;

    this.setState({
      index: index,
      disabledBack: disabledBack,
      disabledNext: false
    });
  }

  toggleNext(e) {
    let index = this.state.index + 1;
    let disabledNext = index === this.props.questions.length - 1;

    this.setState({
      index: index,
      disabledNext: disabledNext,
      disabledBack: false
    });
  }

  render() {
    const { index, disabledNext, disabledBack } = this.state;
    const question = this.props.questions ? this.props.questions[index] : null;

    if (question) {
      return (
        <div className="survey">
          <div>
            <QuestionComp questions={questions} index={index} />
          </div>
          <div className="survey-buttons">
            <Back toggle={e => this.toggleBack(e)} active={disabledBack} />
            <Next toggle={e => this.toggleNext(e)} active={disabledNext} />
          </div>
          <style jsx>
            {`
              .survey {
                text-align: left;
                width: 40%;
              }

              .survey-buttons {
                text-align: center;
                padding: 60px 10px 40px 10px;
              }
            `}
          </style>
        </div>
      );
    } else {
      return <span>error</span>;
    }
  }
}

function Back(props) {
  const classes = useStyles();

  return (
    <Button
      variant="contained"
      className={classes.backButton}
      onClick={props.toggle}
      disabled={props.active}
    >
      Back
    </Button>
  );
}

function Next(props) {
  const classes = useStyles();

  return (
    <Button
      variant="contained"
      className={classes.nextButton}
      onClick={props.toggle}
      disabled={props.active}
    >
      Next
    </Button>
  );
}

const Survey = () => (
  <Layout>
    <div id="survey-1">
      <Main questions={questions} />
    </div>
    <style jsx>
      {`
        #survey-1 {
          padding-top: 150px;
          text-align: center;
          justify-text: center;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      `}
    </style>
  </Layout>
);

export default Survey;
