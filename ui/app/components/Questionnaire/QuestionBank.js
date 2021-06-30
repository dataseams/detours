import React from "react";
import { makeStyles } from "@material-ui/core";

import CitiesField from "./City";
import TravelDatesField from "./TravelDates";
import OccasionField from "./Occasion";
import AgeGenderField from "./AgeGender";
import CompanionField from "./Companion";
import PriorVisitsField from "./PriorVisits";
import GeneralPreferencesField from "./GeneralPreferences";
import FoodNBeveragesField from "./FoodNBeverages";
import MuseumsField from "./Museums";
import RelaxationMethodsField from "./Relaxationmethods";
import OutdoorActivitiesField from "./OutdoorActivities";
import ToursField from "./Tours";
import ShoppingField from "./Shopping";
import ShowsField from "./Shows";
import NightlifeField from "./Nightlife";
import AdventureSportsField from "./AdventureSports";
import NeighborhoodsField from "./Neighborhoods";

const useStyles = makeStyles((theme) => ({
  h3: {
    ...theme.h3,
  },
  question: {
    color: theme.typography.color,
    fontSize: 38,
    fontWeight: 600,
  },
}));

const questionnaireLength = 5;

function QuestionComp(props) {
  const classes = useStyles();

  var comp = {
    1: (
      <div>
        <span className={classes.h3}>
          STEP {props.index}/{questionnaireLength}
        </span>
        <div>
          <p className={classes.question}>
            Which city do you want to travel to?
          </p>
          <CitiesField />
        </div>
      </div>
    ),
    2: (
      <div>
        <span className={classes.h3}>
          STEP {props.index}/{questionnaireLength}
        </span>
        <div>
          <p className={classes.question}>
            When are you planning to take your vacation?
          </p>
          <TravelDatesField />
        </div>
      </div>
    ),
    // 3: (
    //   <div>
    //     <span>STEP {props.index}/{questionnaireLength}</span>
    //     <div>
    //       <h1>What occasion are you celebrating?</h1>
    //       <OccasionField />
    //     </div>
    //   </div>
    // ),
    // 4: (
    //   <div>
    //     <span>STEP {props.index}/{questionnaireLength}</span>
    //     <div>
    //       <h1>What is your age and gender?</h1>
    //       <AgeGenderField />
    //     </div>
    //   </div>
    // ),
    3: (
      <div>
        <span className={classes.h3}>
          STEP {props.index}/{questionnaireLength}
        </span>
        <div>
          <p className={classes.question}>Who are you traveling with?</p>
          <CompanionField />
        </div>
      </div>
    ),
    // 6: (
    //   <div>
    //     <span>STEP {props.index}/{questionnaireLength}</span>
    //     <div>
    //       <h1>Have you traveled to this location before?</h1>
    //       <PriorVisitsField />
    //     </div>
    //   </div>
    // ),
    4: (
      <div>
        <span className={classes.h3}>
          STEP {props.index}/{questionnaireLength}
        </span>
        <div>
          <p className={classes.question}>
            What do you like to do when you travel?
          </p>
          <p>
            <i>Note: choose at least two options.</i>
          </p>
          <GeneralPreferencesField />
        </div>
      </div>
    ),
    5: (
      <div>
        <span className={classes.h3}>
          STEP {props.index}/{questionnaireLength}
        </span>
        <div>
          <p className={classes.question}>Food & Beverages</p>
          <FoodNBeveragesField />
        </div>
      </div>
    ),
    // 9: (
    //   <div>
    //     <span>STEP {props.index}/{questionnaireLength}</span>
    //     <div>
    //       <h1>Which museums do you enjoy the most?</h1>
    //       <MuseumsField />
    //     </div>
    //   </div>
    // ),
    // 10: (
    //   <div>
    //     <span>STEP {props.index}/{questionnaireLength}</span>
    //     <div>
    //       <h1>What are your favorite ways to relax?</h1>
    //       <RelaxationMethodsField />
    //     </div>
    //   </div>
    // ),
    // 11: (
    //   <div>
    //     <span>STEP {props.index}/{questionnaireLength}</span>
    //     <div>
    //       <h1>What are your favorite outdoor activities?</h1>
    //       <OutdoorActivitiesField />
    //     </div>
    //   </div>
    // ),
    // 12: (
    //   <div>
    //     <span>STEP {props.index}/{questionnaireLength}</span>
    //     <div>
    //       <h1>Which tours do you enjoy the most?</h1>
    //       <ToursField />
    //     </div>
    //   </div>
    // ),
    // 13: (
    //   <div>
    //     <span>STEP {props.index}/{questionnaireLength}</span>
    //     <div>
    //       <h1>Shopping</h1>
    //       <ShoppingField />
    //     </div>
    //   </div>
    // ),
    // 14: (
    //   <div>
    //     <span>STEP {props.index}/{questionnaireLength}</span>
    //     <div>
    //       <h1>Which shows and performances do you enjoy the most?</h1>
    //       <ShowsField />
    //     </div>
    //   </div>
    // ),
    // 15: (
    //   <div>
    //     <span>STEP {props.index}/{questionnaireLength}</span>
    //     <div>
    //       <h1>Which type of nightlife do you enjoy the most?</h1>
    //       <NightlifeField />
    //     </div>
    //   </div>
    // ),
    // 16: (
    //   <div>
    //     <span>STEP {props.index}/{questionnaireLength}</span>
    //     <div>
    //       <h1>Which adventure sports do you enjoy the most?</h1>
    //       <AdventureSportsField />
    //     </div>
    //   </div>
    // ),
    // 17: (
    //   <div>
    //     <span>STEP {props.index}/{questionnaireLength}</span>
    //     <div>
    //       <h1>Do you know which neighborhood you'd like to stay in?</h1>
    //       <NeighborhoodsField />
    //     </div>
    //   </div>
    // )
  };

  return comp[props.index];
}

export { QuestionComp, questionnaireLength };
