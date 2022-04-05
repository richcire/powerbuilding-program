import { useLocation } from "react-router";
import { useRecoilState } from "recoil";
import { dataState } from "../atoms";
import styled from "styled-components";
import Row from "./Row";
import { IExercise } from "../DataSample";

const Square = styled.div`
  border: 2px solid black;
  text-align: center;
`;

const AddRowBtn = styled.button`
  background-color: transparent;
  margin-top: 10px;
  width: 80px;
  padding: 10px;
  font-size: 25px;
  &: hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
`;

const Line = styled.hr`
  margin: 0;
  border: none;
  background-color: black;
  height: 1px;
`;
interface IDay {
  dayIndex: "day1" | "day2" | "day3" | "day4" | "day5" | "day6";
  levelIndex: 1 | 1.5 | 2;
}

function Day({ dayIndex, levelIndex }: IDay) {
  const [levelDataState, setLevelDataState] = useRecoilState(dataState);

  const location = useLocation();
  const wIndex = location.pathname.split("/")[2] as
    | "week1"
    | "week2"
    | "week3"
    | "week4"
    | "week5"
    | "week6";

  const onAddClick = () => {
    let targetDay = levelDataState[levelIndex][wIndex]?.[dayIndex];
    const newExercise: IExercise = {
      name: "",
      set: 0,
      weight: 0,
      reps: [0, 0, 0],
      totvol: 0,
    };

    const newExerciseArray = targetDay
      ? [...targetDay, newExercise]
      : [newExercise];

    setLevelDataState((prev) => {
      return {
        ...prev,
        [levelIndex]: {
          ...prev[levelIndex],
          [wIndex]: {
            ...prev[levelIndex][wIndex],
            [dayIndex]: newExerciseArray,
          },
        },
      };
    });
  };
  return (
    <Square>
      {levelDataState[1][wIndex]?.[dayIndex]?.map((element, index) => (
        <Row
          key={index}
          order={index}
          dayIndex={dayIndex}
          name={element.name}
          set={element.set}
          weight={element.weight}
          reps={element.reps}
          totvol={element.totvol}
        ></Row>
      ))}
      <Line />
      <AddRowBtn onClick={onAddClick}>+</AddRowBtn>
    </Square>
  );
}

export default Day;
