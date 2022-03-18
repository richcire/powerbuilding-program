import styled from "styled-components";
import { IExercise } from "../DataSample";

const Line = styled.div`
  display: flex;
  padding: 15px;
  gap: 20px;
  justify-content: space-between;
  border-top: 1px solid black;
`;

const Name = styled.div`
  width: 60px;
`;

const SingleNumber = styled.div`
  width: 30px;
`;
const Room = styled.span`
  width: 20px;
`;
interface IRow {
  children: string;
  name: string;
  set: number;
  weight: number;
  reps: number[];
  totvol: number;
}

function Row({ name, set, weight, reps, totvol }: IRow) {
  return (
    <Line>
      <Name>{name}</Name>
      <SingleNumber>{set}</SingleNumber>
      <SingleNumber>{weight}</SingleNumber>
      {reps.map((rep) => (
        <Room>{rep}</Room>
      ))}
      <SingleNumber>{totvol}</SingleNumber>
    </Line>
  );
}

export default Row;
