import Layout from "../components/MainLayout";
import React from "react";
import Select from "react-select";

// my questions.json
let questions = [
  {
    id: 0,
    desc: "Which city do you want to travel to?"
  },
  {
    id: 1,
    desc: "Kitty"
  },
  {
    id: 2,
    desc: "Ji"
  },
  {
    id: 3,
    desc: "Mattis"
  }
];

const cityOptions = [
  { value: "Paris", label: "Paris, France" },
  { value: "SF", label: "San Francisco, CA" },
  { value: "LA", label: "Los Angeles, CA" },
  { value: "Habana", label: "Habana, Cuba" }
];

class Main extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      index: 1,
      disabledNext: false,
      disabledPrev: false
    };
  }

  togglePrev(e) {
    let index = this.state.index - 1;
    let disabledPrev = index === 0;

    this.setState({
      index: index,
      disabledPrev: disabledPrev,
      disabledNext: false
    });
  }

  toggleNext(e) {
    let index = this.state.index + 1;
    let disabledNext = index === this.props.questions.length - 1;

    this.setState({
      index: index,
      disabledNext: disabledNext,
      disabledPrev: false
    });
  }

  render() {
    const { index, disabledNext, disabledPrev } = this.state;
    const question = this.props.questions ? this.props.questions[index] : null;

    if (question) {
      return (
        <div className="survey">
          <div>
            <h3>STEP 1/15</h3>
            <Question {...question} />
            <div className="survey-buttons">
              <Prev toggle={e => this.togglePrev(e)} active={disabledPrev} />
              <Next toggle={e => this.toggleNext(e)} active={disabledNext} />
            </div>
          </div>
          <style jsx>
            {`
              h3 {
                color: #606DC3,
                text-transform: uppercase;
                font-size: 1.125em;
              }

              .survey {
                text-align: left;
                max-width: 40%;
              }

              .question {
                font-size: 2.375em;
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

function Prev(props) {
  return (
    <dv>
      <button onClick={props.toggle} disabled={props.active}>
        Previous
      </button>
    </dv>
  );
}

function Next(props) {
  return (
    <button onClick={props.toggle} disabled={props.active}>
      Next
    </button>
  );
}

function Question(props) {
  return (
    <div>
      <h1>{props.desc}</h1>
      <Select placeholder="Type or select..." options={cityOptions}></Select>
    </div>
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
