import styled from "styled-components";
import { Routes, Route } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import DayBoard from "./DayBoard";

const Block = styled.div`
  margin: 70px 30px;
  display: flex;
  gap: 20px;
`;

const Week = styled(motion.div)`
  width: 400px;
  height: 400px;
  background-color: red;
  border-radius: 20px;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 1;
`;

function Level1() {
  const [isBoard, setIsBoard] = useState(false);
  const navigate = useNavigate();
  const onOverlayCLick = () => {
    setIsBoard((prev) => !prev);
    navigate(-1);
  };
  const onWeekClick = () => setIsBoard((prev) => !prev);
  return (
    <>
      <Block>
        <Link to="week1">
          <Week onClick={onWeekClick} layoutId="week1"></Week>
        </Link>
        <Week></Week>
        <Week></Week>
        <Week></Week>
        <Week></Week>
        <Week></Week>
      </Block>
      <Block>
        <Week></Week>
        <Week></Week>
        <Week></Week>
        <Week></Week>
        <Week></Week>
        <Week></Week>
      </Block>
      {isBoard ? (
        <Overlay onClick={onOverlayCLick}>
          <DayBoard lid="week1" />
        </Overlay>
      ) : null}
    </>
  );
}

export default Level1;
