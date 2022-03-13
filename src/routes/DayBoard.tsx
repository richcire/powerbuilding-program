import { motion } from "framer-motion";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import Row from "../components/Row";
import { dataSample } from "../DataSample";

const MainBoard = styled(motion.div)`
  width: 90%;
  height: 90%;
  background-color: #ffeaa7;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
`;

const Day = styled.div``;

interface IDayBoard {
  lid: string;
}

function DayBoard({ lid }: IDayBoard) {
  const location = useLocation();
  const { "*": weekNum } = useParams<{
    "*": "week1" | "week2" | "week3" | "week4" | "week5" | "week6";
  }>();

  console.log(location.pathname.includes("level1"));
  if (location.pathname.includes("level1")) {
    return (
      <MainBoard layoutId={lid}>
        {weekNum
          ? Object.values(dataSample[1][weekNum]).map((day, index) => (
              <Day key={index}>
                <div>hello</div>
                {day.map((unit, index) => (
                  <Row
                    key={index}
                    name={unit.name}
                    set={unit.set}
                    weight={unit.weight}
                    rir={unit.rir}
                    reps={unit.reps}
                    totvol={unit.totvol}
                  >
                    {unit.name}
                  </Row>
                ))}
              </Day>
            ))
          : null}
      </MainBoard>
    );
  } else if (location.pathname.includes("level1half")) {
    return null;
  } else if (location.pathname.includes("level2")) {
    return null;
  } else {
    return null;
  }
}

export default DayBoard;
