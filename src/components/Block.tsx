import { motion } from "framer-motion";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import { dataState } from "../atoms";
import DayBoard from "../routes/DayBoard";
import { levelIndexToNum } from "../utils";

const Weeks = styled.div`
  margin: 70px 30px;
  display: flex;
  justify-content: space-between;
  gap: 20px;
`;

const Week = styled.div`
  width: 270px;
  height: 400px;
  background-color: #353b48;
  border-radius: 20px;
  display: flex;
  align-items: center;
  color: white;
  font-size: 70px;
  flex-direction: column;
  gap: 80px;
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const WeekIndexTitle = styled.div`
  margin-top: 20px;
  font-size: 50px;
`;

type weekIndex = "week1" | "week2" | "week3" | "week4" | "week5" | "week6";

interface IBlock {
  levelIndex: 1 | 1.5 | 2;
}

function Block({ levelIndex }: IBlock) {
  const [isBoard, setIsBoard] = useState(false);
  const onWeekClick = () => setIsBoard((prev) => !prev);

  const levelDataState = useRecoilValue(dataState);

  const navigate = useNavigate();
  const onOverlayCLick = () => {
    setIsBoard((prev) => !prev);
    navigate(-1);
  };
  console.log(levelDataState);
  function weekTotVal(wIndex: weekIndex) {
    const weekData = levelDataState[levelIndex][wIndex] ?? [];
    let sum = 0;
    for (const value of Object.values(weekData)) {
      value.forEach((exercise: { totvol: number }) => {
        sum += exercise.totvol;
      });
    }
    return sum;
  }

  const wIndexList = [1, 2, 3, 4, 5, 6];

  return (
    <>
      <Weeks>
        {wIndexList.map((wIndex) => (
          <Link
            style={{ textDecoration: "none" }}
            to={`week${wIndex}`}
            key={wIndex}
          >
            <Week onClick={onWeekClick}>
              <WeekIndexTitle>week{wIndex}</WeekIndexTitle>
              {weekTotVal(`week${wIndex}` as weekIndex)}
            </Week>
          </Link>
        ))}
      </Weeks>
      {isBoard ? (
        <Overlay
          onClick={onOverlayCLick}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <DayBoard />
        </Overlay>
      ) : null}
    </>
  );
}

export default Block;
