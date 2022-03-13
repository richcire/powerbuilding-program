import { IExercise } from "../DataSample";

interface IRow {
  children: string;
  name: string;
  set: number;
  weight: number;
  rir: number;
  reps: number[];
  totvol: number;
}
function Row({ name, set, weight, rir, reps, totvol }: IRow) {
  return <div>{name}</div>;
}

export default Row;
