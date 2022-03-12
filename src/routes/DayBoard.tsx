import { motion } from "framer-motion";
import { useParams } from "react-router";
import styled from "styled-components";

const MainBoard = styled(motion.div)`
  width: 600px;
  height: 600px;
  background-color: yellow;
`;

interface IDayBoard {
  lid: string;
}
function DayBoard({ lid }: IDayBoard) {
  const params = useParams();
  console.log(params["*"]);
  return <MainBoard layoutId={lid}></MainBoard>;
}

export default DayBoard;
