import { doc, updateDoc } from "@firebase/firestore";
import React, { useState } from "react";
import { useLocation } from "react-router";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { dataState } from "../atoms";
import { Level1ID } from "../constants";
import { IExercise } from "../DataSample";
import { db } from "../firebase-config";

const Line = styled.form`
  display: flex;
  padding: 15px;
  gap: 20px;
  justify-content: space-between;
  border-top: 1px solid black;
`;

const Name = styled.input`
  width: 60px;
`;

const SingleNumber = styled.input`
  width: 30px;
`;
const Room = styled.input`
  width: 20px;
`;

const TotVol = styled.div`
  width: 30px;
`;

const SubmitBtn = styled.button``;

interface IRow {
  order: number;
  name: string;
  set: number;
  weight: number;
  reps: number[];
  totvol: number;
}
//change to input area
function Row({ order, name, set, weight, reps, totvol }: IRow) {
  const docRef = doc(db, "level1", Level1ID);

  const [levelDataState, setLevelDataState] = useRecoilState(dataState);

  const [preName, setPreName] = useState<string>(name);
  const [preSet, setPreSet] = useState<number>(set);
  const [preWeight, setPreWeight] = useState<number>(weight);
  const [preReps, setPreReps] = useState<number[]>(reps);

  const location = useLocation();
  const wIndex = location.pathname.split("/")[2] as
    | "week1"
    | "week2"
    | "week3"
    | "week4"
    | "week5"
    | "week6";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const targetDay = levelDataState[1][wIndex]?.day1;

    const exercise: IExercise = {
      name: preName,
      set: preSet,
      weight: preWeight,
      reps: preReps,
      totvol: totvol,
    };
    const newExerciseArray = targetDay ? [...targetDay] : [exercise];
    newExerciseArray[order] = exercise;
    console.log(newExerciseArray);

    // setLevelDataState((prev) => {
    //   return {
    //     ...prev,
    //     [1]: {
    //       ...prev[1],
    //       [wIndex]: {
    //         ...prev[1][wIndex],
    //         day1: newExerciseArray,
    //       },
    //     },
    //   };
    // });
    await updateDoc(docRef, {
      "week1.day1": newExerciseArray,
    });
    //change default access parameters
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPreName(e.target.value);
  };
  const handleSetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPreSet(Number(e.target.value));
  };
  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPreWeight(Number(e.target.value));
  };
  const handleRepsChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const repsCopy = [...preReps];
    repsCopy[index] = Number(e.target.value);
    setPreReps(repsCopy);
  };
  return (
    <Line onSubmit={handleSubmit}>
      <Name value={preName} onChange={handleNameChange} />
      <SingleNumber value={preSet} onChange={handleSetChange} />
      <SingleNumber value={preWeight} onChange={handleWeightChange} />
      {reps.map((rep, index) => (
        <Room
          key={index}
          value={preReps[index]}
          onChange={(event) => handleRepsChange(event, index)}
        />
      ))}
      <TotVol>{totvol}</TotVol>
      <SubmitBtn type="submit">Submit</SubmitBtn>
    </Line>
  );
}

export default Row;
