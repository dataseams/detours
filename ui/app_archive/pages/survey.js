// Global modules
import Layout from "../components/MainLayout";
import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core";
// Local modules
import Occasion from "../components/q-occasions";
import City from "../components/q-cities";
import TravelDates from "../components/q-dates";
import AgeGender from "../components/q-agegender";
import Companion from "../components/q-companion";
import PriorVisit from "../components/q-priorvisits";
import GeneralPreferences from "../components/q-generalpreferences";
import FoodnBeverages from "../components/q-winendine";
import Museums from "../components/q-museums";
import Relaxation from "../components/q-relaxation";
import OutdoorActivities from "../components/q-outdooractivities";
import Tours from "../components/q-tours";
import Shopping from "../components/q-shopping";
import Shows from "../components/q-shows";
import Nightlife from "../components/q-nightlife";
import AdventureSports from "../components/q-adventuresports";
import Neighborhoods from "../components/q-neighborhoods";

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
    desc: "Who are you traveling with?"
  },
  {
    id: 5,
    desc: "Have you traveled to this location before?"
  },
  {
    id: 6,
    desc: "What do you like to do when you travel?"
  },
  {
    id: 7,
    desc: "Which shows and performances do you enjoy the most?"
  },
  {
    id: 8,
    desc: "Which museums do you enjoy the most?"
  },
  {
    id: 9,
    desc: "What are your favorite ways to relax?"
  },
  {
    id: 10,
    desc: "What are your favorite outdoor activities?"
  },
  {
    id: 11,
    desc: "Which tours do you enjoy the most?"
  },
  {
    id: 12,
    desc: "Shopping"
  },
  {
    id: 13,
    desc: "Shows & Performances"
  },
  {
    id: 14,
    desc: "Which type of nightlife do you enjoy the most?"
  },
  {
    id: 15,
    desc: "Which adventure sports do you enjoy the most?"
  },
  {
    id: 16,
    desc: "Do you know which neighborhood you'd like to stay in?"
  },
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

function QuestionComp(props) {
  questions = props.questions;
  const question = questions ? questions[props.index] : null;

  var comp = {
    0: (
      <div>
        <span>STEP 1/17</span>
        <div>
          <h1>{question.desc}</h1>
          <City />
        </div>
      </div>
    ),
    1: (
      <div>
        <span>STEP 2/17</span>
        <div>
          <h1>{question.desc}</h1>
          <TravelDates />
        </div>
      </div>
    ),
    2: (
      <div>
        <span>STEP 3/17</span>
        <div>
          <h1>{question.desc}</h1>
          <Occasion />
        </div>
      </div>
    ),
    3: (
      <div>
        <span>STEP 4/17</span>
        <div>
          <h1>{question.desc}</h1>
          <AgeGender />
        </div>
      </div>
    ),
    4: (
      <div>
        <span>STEP 5/17</span>
        <div>
          <h1>{question.desc}</h1>
          <Companion />
        </div>
      </div>
    ),
    5: (
      <div>
        <span>STEP 6/17</span>
        <div>
          <h1>{question.desc}</h1>
          <PriorVisit />
        </div>
      </div>
    ),
    6: (
      <div>
        <span>STEP 7/17</span>
        <div>
          <h1>{question.desc}</h1>
          <GeneralPreferences />
        </div>
      </div>
    ),
    7: (
      <div>
        <span>STEP 8/17</span>
        <div>
          <h1>{question.desc}</h1>
          <FoodnBeverages />
        </div>
      </div>
    ),
    8: (
      <div>
        <span>STEP 9/17</span>
        <div>
          <h1>{question.desc}</h1>
          <Museums />
        </div>
      </div>
    ),
    9: (
      <div>
        <span>STEP 10/17</span>
        <div>
          <h1>{question.desc}</h1>
          <Relaxation />
        </div>
      </div>
    ),
    10: (
      <div>
        <span>STEP 11/17</span>
        <div>
          <h1>{question.desc}</h1>
          <OutdoorActivities />
        </div>
      </div>
    ),
    11: (
      <div>
        <span>STEP 12/17</span>
        <div>
          <h1>{question.desc}</h1>
          <Tours />
        </div>
      </div>
    ),
    12: (
      <div>
        <span>STEP 13/17</span>
        <div>
          <h1>{question.desc}</h1>
          <Shopping />
        </div>
      </div>
    ),
    13: (
      <div>
        <span>Step 14/17</span>
        <div>
          <h1>{question.desc}</h1>
          <Shows />
        </div>
      </div>
    ),
    14: (
      <div>
        <span>Step 15/17</span>
        <div>
          <h1>{question.desc}</h1>
          <Nightlife />
        </div>
      </div>
    ),
    15: (
      <div>
        <span>Step 16/17</span>
        <div>
          <h1>{question.desc}</h1>
          <AdventureSports />
        </div>
      </div>
    ),
    16: (
      <div>
        <span>Step 17/17</span>
        <div>
          <h1>{question.desc}</h1>
          <Neighborhoods />
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
      index: 12,
      disabledNext: false,
      disabledBack: false
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
                width: 45%;
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
