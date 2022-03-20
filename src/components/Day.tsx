import { useLocation } from "react-router";
import { useRecoilState } from "recoil";
import { dataState } from "../atoms";
import styled from "styled-components";
import Row from "./Row";

const Square = styled.div`
  border: 2px solid black;
`;

interface IDay {
  dayIndex: "day1" | "day2" | "day3" | "day4" | "day5" | "day6";
}
function Day({ dayIndex }: IDay) {
  const [levelDataState, setLevelDataState] = useRecoilState(dataState);
  const location = useLocation();
  //const [garbage, levelIndex, weekIndex] = location.pathname.split("/");
  const wIndex = location.pathname.split("/")[2] as
    | "week1"
    | "week2"
    | "week3"
    | "week4"
    | "week5"
    | "week6";
  //console.log(wIndex);

  return (
    <Square>
      {levelDataState[1][wIndex]?.[dayIndex]?.map((element, index) => (
        <Row
          key={index}
          name={element.name}
          set={element.set}
          weight={element.weight}
          reps={element.reps}
          totvol={element.totvol}
        ></Row>
      ))}
    </Square>
  );
}

export default Day;
