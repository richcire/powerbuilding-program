import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase-config";
import React, { useEffect } from "react";
import Day from "../components/Day";
import { useRecoilState } from "recoil";
import { dataState, ILevel } from "../atoms";
import { getDocId, levelIndexToNum } from "../utils";

const MainBoard = styled(motion.div)`
  width: 90%;
  height: 90%;
  background-color: #ffeaa7;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 1fr 1fr;
`;

// interface IDayBoard {
//   lid: string;
// }

const dayList: ("day1" | "day2" | "day3" | "day4" | "day5" | "day6")[] = [
  "day1",
  "day2",
  "day3",
  "day4",
  "day5",
  "day6",
];

function DayBoard() {
  const location = useLocation();
  const [, levelIndex, weekIndex] = location.pathname.split("/");
  const levelIndexNum = levelIndexToNum(levelIndex);
  const docRef = doc(db, levelIndex, getDocId(levelIndex));
  const [levelDataState, setLevelDataState] = useRecoilState(dataState);

  const handleChildElementClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    // Do other stuff here
  };

  const getData = async () => {
    const docSnap = await getDoc(docRef);
    const snapshot = docSnap.data() as ILevel;
    setLevelDataState((prev) => {
      return {
        ...prev,
        [levelIndexNum]: snapshot,
      };
    });
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <MainBoard onClick={handleChildElementClick}>
      {dayList.map((day) => (
        <Day key={day} dayIndex={day} levelIndex={levelIndexNum}></Day>
      ))}
    </MainBoard>
  );
}

export default DayBoard;
