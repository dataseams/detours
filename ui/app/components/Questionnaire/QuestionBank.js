import React from "react";

import CitiesField from "./City";
import TravelDateFields from "./TravelDates";
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

const questionnaireLength = 5;

function QuestionComp(props) {
  var comp = {
    1: (
      <div>
        <span>STEP 1/{questionnaireLength}</span>
        <div>
          <h1>Which city do you want to travel to?</h1>
          <CitiesField />
        </div>
      </div>
    ),
    2: (
      <div>
        <span>STEP 2/{questionnaireLength}</span>
        <div>
          <h1>When are you planning to take your vacation?</h1>
          <TravelDateFields />
        </div>
      </div>
    ),
    // 3: (
    //   <div>
    //     <span>STEP 3/{questionnaireLength}</span>
    //     <div>
    //       <h1>What occasion are you celebrating?</h1>
    //       <OccasionField />
    //     </div>
    //   </div>
    // ),
    // 4: (
    //   <div>
    //     <span>STEP 4/{questionnaireLength}</span>
    //     <div>
    //       <h1>What is your age and gender?</h1>
    //       <AgeGenderField />
    //     </div>
    //   </div>
    // ),
    3: (
      <div>
        <span>STEP 5/{questionnaireLength}</span>
        <div>
          <h1>Who are you traveling with?</h1>
          <CompanionField />
        </div>
      </div>
    ),
    // 6: (
    //   <div>
    //     <span>STEP 6/{questionnaireLength}</span>
    //     <div>
    //       <h1>Have you traveled to this location before?</h1>
    //       <PriorVisitsField />
    //     </div>
    //   </div>
    // ),
    4: (
      <div>
        <span>STEP 7/{questionnaireLength}</span>
        <div>
          <h1>What do you like to do when you travel?</h1>
          <GeneralPreferencesField />
        </div>
      </div>
    ),
    5: (
      <div>
        <span>STEP 8/{questionnaireLength}</span>
        <div>
          <h1>Food & Beverages</h1>
          <FoodNBeveragesField />
        </div>
      </div>
    ),
    // 9: (
    //   <div>
    //     <span>STEP 9/{questionnaireLength}</span>
    //     <div>
    //       <h1>Which museums do you enjoy the most?</h1>
    //       <MuseumsField />
    //     </div>
    //   </div>
    // ),
    // 10: (
    //   <div>
    //     <span>STEP 10/{questionnaireLength}</span>
    //     <div>
    //       <h1>What are your favorite ways to relax?</h1>
    //       <RelaxationMethodsField />
    //     </div>
    //   </div>
    // ),
    // 11: (
    //   <div>
    //     <span>STEP 11/{questionnaireLength}</span>
    //     <div>
    //       <h1>What are your favorite outdoor activities?</h1>
    //       <OutdoorActivitiesField />
    //     </div>
    //   </div>
    // ),
    // 12: (
    //   <div>
    //     <span>STEP 12/{questionnaireLength}</span>
    //     <div>
    //       <h1>Which tours do you enjoy the most?</h1>
    //       <ToursField />
    //     </div>
    //   </div>
    // ),
    // 13: (
    //   <div>
    //     <span>STEP 13/{questionnaireLength}</span>
    //     <div>
    //       <h1>Shopping</h1>
    //       <ShoppingField />
    //     </div>
    //   </div>
    // ),
    // 14: (
    //   <div>
    //     <span>STEP 14/{questionnaireLength}</span>
    //     <div>
    //       <h1>Which shows and performances do you enjoy the most?</h1>
    //       <ShowsField />
    //     </div>
    //   </div>
    // ),
    // 15: (
    //   <div>
    //     <span>STEP 15/{questionnaireLength}</span>
    //     <div>
    //       <h1>Which type of nightlife do you enjoy the most?</h1>
    //       <NightlifeField />
    //     </div>
    //   </div>
    // ),
    // 16: (
    //   <div>
    //     <span>STEP 16/{questionnaireLength}</span>
    //     <div>
    //       <h1>Which adventure sports do you enjoy the most?</h1>
    //       <AdventureSportsField />
    //     </div>
    //   </div>
    // ),
    // 17: (
    //   <div>
    //     <span>STEP 17/{questionnaireLength}</span>
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
