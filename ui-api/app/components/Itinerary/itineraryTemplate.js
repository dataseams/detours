const sampleItinerary = {
  surveyId: 1,
  summary: {
    city: "Paris, France",
    spendingPerDay: "$176",
    hoursSaved: "20-30 hours",
    interestsMatched: [
      "Intimate, authentic dining",
      "Markets",
      "Massages",
      "Walking tours",
      "Wine bars"
    ]
  },
  plan: {
    days: [
      {
        order: 0,
        date: "2019-01-01",
        events: [
          {
            order: 1,
            category: "Hotel",
            materialIcon: "hotel",
            title: "Maison Natale Bernard Buffet",
            activity: "Wake-up",
            description:
              "Featuring a low-key art deco style, this conservative hotel is a 1-minute walk from the Cadet metro station."
          },
          {
            order: 2,
            category: "Food",
            materialIcon: "restaurant",
            title: "Le Pain Quotidient",
            activity: "Breakfast",
            description: "A historical landmark with breakfast experience."
          },
          {
            order: 3,
            category: "Tours",
            materialIcon: "directions_bike",
            title: "Holland Bikes Notre Dame",
            activity: "Biking",
            description: "A self-guided bike tour in the old city."
          },
          {
            order: 4,
            category: "Food",
            materialIcon: "restaurant",
            title: "Le Soufle",
            activity: "Lunch",
            description:
              "A local favorite, known for its generosity and tasty souffles."
          },
          {
            order: 5,
            category: "Hotel",
            materialIcon: "hotel",
            title: "Maison Natale Bernard",
            activity: "Sleep",
            description:
              "Go back to bed."
          },
          {
            order: 6,
            category: "Hotel",
            materialIcon: "hotel",
            title: "Maison Natale Bernard",
            activity: "Sleep",
            description:
              "Sleep deeper."
          }
        ]
      },
      {
        order: 1,
        date: "2019-01-02",
        events: [
          {
            order: 1,
            category: "Hotel",
            materialIcon: "hotel",
            title: "Maison Natale Bernard Buffet",
            activity: "Wake-up",
            description:
              "Featuring a low-key art deco style, this conservative hotel is a 1-minute walk from the Cadet metro station."
          }
        ]
      },
      {
        order: 2,
        date: "2019-01-03",
        events: [
          {
            order: 1,
            category: "Hotel",
            materialIcon: "hotel",
            title: "Maison Natale Bernard Buffet",
            activity: "Wake-up",
            description:
              "Featuring a low-key art deco style, this conservative hotel is a 1-minute walk from the Cadet metro station."
          }
        ]
      },
      {
        order: 3,
        date: "2019-01-04",
        events: [
          {
            order: 1,
            category: "Hotel",
            materialIcon: "hotel",
            title: "Maison Natale Bernard Buffet",
            activity: "Wake-up",
            description:
              "Featuring a low-key art deco style, this conservative hotel is a 1-minute walk from the Cadet metro station."
          }
        ]
      }
    ]
  }
};

export default sampleItinerary;
