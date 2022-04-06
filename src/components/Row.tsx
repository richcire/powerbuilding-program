import { doc, updateDoc } from "@firebase/firestore";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { dataState, isRowMax } from "../atoms";
import { IExercise } from "../DataSample";
import { db } from "../firebase-config";
import { calculateTotVol, getDocId, levelIndexToNum } from "../utils";

const Line = styled.form`
  display: flex;
  padding: 15px;
  gap: 20px;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid black;
  font-size: 20px;
  height: 7%;
`;

const Name = styled.input`
  background-color: transparent;
  width: 70px;
`;

const SingleNumber = styled.input`
  background-color: transparent;
  width: 30px;
`;

const Room = styled.input`
  background-color: transparent;
  width: 20px;
  &: hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
`;

const TotVol = styled.div`
  width: 30px;
`;

const SubmitBtn = styled.button`
  background-color: transparent;
  padding: 5px;
  border-radius: 3px;
  &: hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
`;

const DeleteBtn = styled.button`
  background-color: transparent;
  font-size: 30px;
  height: 25px;
  width: 20px;
  border-radius: 4px;
  &: hover {
    background-color: rgba(255, 0, 0, 0.3);
  }
`;

type weekIndex = "week1" | "week2" | "week3" | "week4" | "week5" | "week6";
interface IRow {
  order: number;
  dayIndex: "day1" | "day2" | "day3" | "day4" | "day5" | "day6";
  name: string;
  set: number;
  weight: number;
  reps: number[];
  totvol: number;
}
//change to input area
function Row({ order, dayIndex, name, set, weight, reps, totvol }: IRow) {
  const location = useLocation();
  const levelIndex = location.pathname.split("/")[1];

  const docRef = doc(db, levelIndex, getDocId(levelIndex));

  const [levelDataState, setLevelDataState] = useRecoilState(dataState);

  const [preName, setPreName] = useState<string>(name);
  const [preSet, setPreSet] = useState<number>(set);
  const [preWeight, setPreWeight] = useState<number>(weight);
  const [preReps, setPreReps] = useState<number[]>(reps);
  const levelIndexNum = levelIndexToNum(levelIndex);
  const preTotVol = calculateTotVol(preWeight, preReps);
  //preName doesnt change

  const setIsMax = useSetRecoilState(isRowMax);

  useEffect(() => {
    setPreName(name);
    setPreSet(set);
    setPreReps(reps);
  }, [name]);

  const wIndex = location.pathname.split("/")[2] as weekIndex;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const targetDay = levelDataState[levelIndexNum][wIndex]?.[dayIndex];

    const exercise: IExercise = {
      name: preName,
      set: preSet,
      weight: preWeight,
      reps: preReps,
      totvol: preTotVol,
    };
    const newExerciseArray = targetDay ? [...targetDay] : [exercise];
    newExerciseArray[order] = exercise;

    setLevelDataState((prev) => {
      return {
        ...prev,
        [levelIndexNum]: {
          ...prev[levelIndexNum],
          [wIndex]: {
            ...prev[levelIndexNum][wIndex],
            [dayIndex]: newExerciseArray,
          },
        },
      };
    });
    const field = wIndex + "." + dayIndex;
    await updateDoc(docRef, {
      [field]: newExerciseArray,
    });
  };

  const deleteRow = async () => {
    const targetDay = levelDataState[levelIndexNum][wIndex]?.[dayIndex];

    const isTargetDayMax = targetDay?.length === 6 ? true : false;
    setIsMax(isTargetDayMax);

    const newExerciseArray = targetDay ? [...targetDay] : [];
    newExerciseArray.splice(order, 1);
    console.log(newExerciseArray);
    const field = wIndex + "." + dayIndex;
    setLevelDataState((prev) => {
      return {
        ...prev,
        [levelIndexNum]: {
          ...prev[levelIndexNum],
          [wIndex]: {
            ...prev[levelIndexNum][wIndex],
            [dayIndex]: newExerciseArray,
          },
        },
      };
    });
    await updateDoc(docRef, {
      [field]: newExerciseArray,
    });
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPreName(e.target.value);
  };
  const handleSetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPreSet(Number(e.target.value));
    setPreReps(Array.from({ length: preSet }, (v, i) => 0));
    console.log(preReps);
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

  const arr = Array.from({ length: preSet }, () => 0);

  return (
    <Line onSubmit={handleSubmit}>
      <Name value={preName} onChange={handleNameChange} />
      <SingleNumber value={preSet} onChange={handleSetChange} />
      <SingleNumber value={preWeight} onChange={handleWeightChange} />
      {arr.map((rep, index) => (
        <Room
          key={index}
          value={preReps[index]}
          onChange={(event) => handleRepsChange(event, index)}
        />
      ))}
      <TotVol>{preTotVol}</TotVol>
      <SubmitBtn type="submit">Submit</SubmitBtn>
      <DeleteBtn type="button" onClick={deleteRow}>
        -
      </DeleteBtn>
    </Line>
  );
}

export default Row;
