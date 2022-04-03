import { atom } from "recoil";

interface IExercise {
  name: string;
  set: number;
  weight: number;
  reps: number[];
  totvol: number;
}

interface IWeek {
  day1?: IExercise[];
  day2?: IExercise[];
  day3?: IExercise[];
  day4?: IExercise[];
  day5?: IExercise[];
  day6?: IExercise[];
}

export interface ILevel {
  week1?: IWeek;
  week2?: IWeek;
  week3?: IWeek;
  week4?: IWeek;
  week5?: IWeek;
  week6?: IWeek;
}

export interface IData {
  1: ILevel;
  1.5: ILevel;
  2: ILevel;
}

export const dataState = atom<IData>({
  key: "data",
  default: {
    1: {},
    1.5: {},
    2: {},
  },
});
