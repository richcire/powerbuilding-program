import { Level1ID, Level1halfID, Level2ID } from "./constants";

export const getDocId = (levelIndex: string) =>
  levelIndex === "level1"
    ? Level1ID
    : levelIndex === "level1half"
    ? Level1halfID
    : Level2ID;

export const levelIndexToNum = (levelIndex: string) =>
  levelIndex === "level1" ? 1 : levelIndex === "level1half" ? 1.5 : 2;

export function calculateTotVol(weight: number, reps: number[]) {
  let sum = 0;
  for (const rep of reps) {
    sum += rep;
  }
  return weight * sum;
}
