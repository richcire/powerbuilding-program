import { motion } from "framer-motion";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import Row from "../components/Row";
import { dataSample } from "../DataSample";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase-config";
import { useEffect } from "react";
import Day from "../components/Day";
import { useRecoilState } from "recoil";
import { dataState, IData, ILevel } from "../atoms";
import { Level1ID } from "../constants";

const MainBoard = styled(motion.div)`
  width: 90%;
  height: 90%;
  background-color: #ffeaa7;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;

const Title = styled.div`
  padding: 15px;
  font-size: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
interface IDayBoard {
  lid: string;
}

const dayList: ("day1" | "day2" | "day3" | "day4" | "day5" | "day6")[] = [
  "day1",
  "day2",
  "day3",
  "day4",
  "day5",
  "day6",
];

function DayBoard({ lid }: IDayBoard) {
  const location = useLocation();
  const [, levelIndex, weekIndex] = location.pathname.split("/");
  const levelIndexNum =
    levelIndex === "level1" ? 1 : levelIndex === "level1half" ? 1.5 : 2;
  const docRef = doc(db, levelIndex, Level1ID);
  const [levelDataState, setLevelDataState] = useRecoilState(dataState);

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
  // const { "*": weekNum } = useParams<{
  //   "*": "week1" | "week2" | "week3" | "week4" | "week5" | "week6" | undefined;
  // }>();
  return (
    <MainBoard>
      {dayList.map((day) => (
        <Day key={day} dayIndex={day}></Day>
      ))}
    </MainBoard>
  );
  // if (location.pathname.includes("level1")) {
  //   return (
  //     <MainBoard layoutId={lid}>
  //       {weekNum
  //         ? Object.values(dataSample[1][weekNum]).map((day, index) => (
  //             <Day key={index}>
  //               <Title>DAY {index + 1}</Title>
  //               {day.map((unit, index) => (
  //                 <Row
  //                   key={index}
  //                   name={unit.name}
  //                   set={unit.set}
  //                   weight={unit.weight}
  //                   reps={unit.reps}
  //                   totvol={unit.totvol}
  //                 >
  //                   {unit.name}
  //                 </Row>
  //               ))}
  //             </Day>
  //           ))
  //         : null}
  //     </MainBoard>
  //   );
  // } else if (location.pathname.includes("level1half")) {
  //   return null;
  // } else if (location.pathname.includes("level2")) {
  //   return null;
  // } else {
  //   return null;
  // }
}

export default DayBoard;
