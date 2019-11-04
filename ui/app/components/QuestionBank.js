import React from "react";

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

var questions = [
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
    desc: "Food & Beverages"
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
    desc: "Which shows and performances do you enjoy the most?"
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
  }
];

function QuestionComp(props) {
  questions = props.questions;
  const question = questions ? questions[props.index] : null;

  var comp = {
    0: (
      <div>
        <span>
          STEP {question.id + 1}/{questions.length}
        </span>
        <div>
          <h1>{question.desc}</h1>
          <City handleChange={props.handleChange}/>
        </div>
      </div>
    ),
    1: (
      <div>
        <span>
          STEP {question.id + 1}/{questions.length}
        </span>
        <div>
          <h1>{question.desc}</h1>
          <TravelDates />
        </div>
      </div>
    ),
    2: (
      <div>
        <span>
          STEP {question.id + 1}/{questions.length}
        </span>
        <div>
          <h1>{question.desc}</h1>
          <Occasion />
        </div>
      </div>
    ),
    3: (
      <div>
        <span>
          STEP {question.id + 1}/{questions.length}
        </span>
        <div>
          <h1>{question.desc}</h1>
          <AgeGender />
        </div>
      </div>
    ),
    4: (
      <div>
        <span>
          STEP {question.id + 1}/{questions.length}
        </span>
        <div>
          <h1>{question.desc}</h1>
          <Companion />
        </div>
      </div>
    ),
    5: (
      <div>
        <span>
          STEP {question.id + 1}/{questions.length}
        </span>
        <div>
          <h1>{question.desc}</h1>
          <PriorVisit />
        </div>
      </div>
    ),
    6: (
      <div>
        <span>
          STEP {question.id + 1}/{questions.length}
        </span>
        <div>
          <h1>{question.desc}</h1>
          <GeneralPreferences />
        </div>
      </div>
    ),
    7: (
      <div>
        <span>
          STEP {question.id + 1}/{questions.length}
        </span>
        <div>
          <h1>{question.desc}</h1>
          <FoodnBeverages />
        </div>
      </div>
    ),
    8: (
      <div>
        <span>
          STEP {question.id + 1}/{questions.length}
        </span>
        <div>
          <h1>{question.desc}</h1>
          <Museums />
        </div>
      </div>
    ),
    9: (
      <div>
        <span>
          STEP {question.id + 1}/{questions.length}
        </span>
        <div>
          <h1>{question.desc}</h1>
          <Relaxation />
        </div>
      </div>
    ),
    10: (
      <div>
        <span>
          STEP {question.id + 1}/{questions.length}
        </span>
        <div>
          <h1>{question.desc}</h1>
          <OutdoorActivities />
        </div>
      </div>
    ),
    11: (
      <div>
        <span>
          STEP {question.id + 1}/{questions.length}
        </span>
        <div>
          <h1>{question.desc}</h1>
          <Tours />
        </div>
      </div>
    ),
    12: (
      <div>
        <span>
          STEP {question.id + 1}/{questions.length}
        </span>
        <div>
          <h1>{question.desc}</h1>
          <Shopping />
        </div>
      </div>
    ),
    13: (
      <div>
        <span>
          STEP {question.id + 1}/{questions.length}
        </span>
        <div>
          <h1>{question.desc}</h1>
          <Shows />
        </div>
      </div>
    ),
    14: (
      <div>
        <span>
          STEP {question.id + 1}/{questions.length}
        </span>
        <div>
          <h1>{question.desc}</h1>
          <Nightlife />
        </div>
      </div>
    ),
    15: (
      <div>
        <span>
          STEP {question.id + 1}/{questions.length}
        </span>
        <div>
          <h1>{question.desc}</h1>
          <AdventureSports />
        </div>
      </div>
    ),
    16: (
      <div>
        <span>
          STEP {question.id + 1}/{questions.length}
        </span>
        <div>
          <h1>{question.desc}</h1>
          <Neighborhoods />
        </div>
      </div>
    )
  };

  return comp[props.index];
}

export { QuestionComp, questions };
