export interface IExercise {
  name: string;
  set: number;
  weight: number;
  reps: number[];
  totvol: number;
}

interface IDataSmaple {
  1: {
    week1?: {
      day1?: IExercise[];
      day2?: IExercise[];
      day3?: IExercise[];
      day4?: IExercise[];
      day5?: IExercise[];
      day6?: IExercise[];
    };
    week2?: {
      day1?: IExercise[];
      day2?: IExercise[];
      day3?: IExercise[];
      day4?: IExercise[];
      day5?: IExercise[];
      day6?: IExercise[];
    };
    week3?: {
      day1?: IExercise[];
      day2?: IExercise[];
      day3?: IExercise[];
      day4?: IExercise[];
      day5?: IExercise[];
      day6?: IExercise[];
    };
    week4?: {
      day1?: IExercise[];
      day2?: IExercise[];
      day3?: IExercise[];
      day4?: IExercise[];
      day5?: IExercise[];
      day6?: IExercise[];
    };
    week5?: {
      day1?: IExercise[];
      day2?: IExercise[];
      day3?: IExercise[];
      day4?: IExercise[];
      day5?: IExercise[];
      day6?: IExercise[];
    };
    week6?: {
      day1?: IExercise[];
      day2?: IExercise[];
      day3?: IExercise[];
      day4?: IExercise[];
      day5?: IExercise[];
      day6?: IExercise[];
    };
  };
}
export const dataSample: IDataSmaple = {
  1: {
    week1: {
      day1: [
        {
          name: "shrug",
          set: 3,
          weight: 10,
          reps: [12, 12, 12],
          totvol: 100,
        },
        {
          name: "benchpress",
          set: 3,
          weight: 10,
          reps: [12, 12, 12],
          totvol: 100,
        },
      ],
      day2: [
        {
          name: "shrug1",
          set: 3,
          weight: 10,
          reps: [12, 12, 12],
          totvol: 100,
        },
      ],
      day3: [
        {
          name: "shrug2",
          set: 3,
          weight: 10,
          reps: [12, 12, 12],
          totvol: 100,
        },
      ],
      day4: [
        {
          name: "shrug3",
          set: 3,
          weight: 10,
          reps: [12, 12, 12],
          totvol: 100,
        },
      ],
      day5: [
        {
          name: "shrug4",
          set: 3,
          weight: 10,
          reps: [12, 12, 12],
          totvol: 100,
        },
      ],
      day6: [
        {
          name: "shru5",
          set: 3,
          weight: 10,
          reps: [12, 12, 12],
          totvol: 100,
        },
      ],
    },
    week2: {},
    week3: {},
    week4: {},
    week5: {},
    week6: {},
  },
};
