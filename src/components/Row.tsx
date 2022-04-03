import React, { useState } from "react";
import styled from "styled-components";

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

const SingleNumber = styled.div`
  width: 30px;
`;
const Room = styled.span`
  width: 20px;
`;

const SubmitBtn = styled.button``;

interface IRow {
  name: string;
  set: number;
  weight: number;
  reps: number[];
  totvol: number;
}
//change to input area
function Row({ name, set, weight, reps, totvol }: IRow) {
  const exerciseReset: IRow = {
    name,
    set,
    weight,
    reps,
    totvol,
  };

  const [exercise, setExercise] = useState<IRow>(exerciseReset);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    area: "name" | "set" | "weight" | "reps" | "totvol"
  ) => {
    console.log("fix this function for various inputs below");
  };

  return (
    <Line onSubmit={handleSubmit}>
      <Name
        value={exercise.name}
        onChange={(e) =>
          setExercise((prev) => {
            return { ...prev, name: e.target.value };
          })
        }
      />
      <SingleNumber>{set}</SingleNumber>
      <SingleNumber>{weight}</SingleNumber>
      {reps.map((rep, index) => (
        <Room key={index}>{rep}</Room>
      ))}
      <SingleNumber>{totvol}</SingleNumber>
      <SubmitBtn>Submit</SubmitBtn>
    </Line>
  );
}

export default Row;
