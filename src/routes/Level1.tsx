import styled from "styled-components";
import { Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import { useState } from "react";

const Block = styled.div`
  margin: 70px 30px;
  display: flex;
  gap: 20px;
`;

const Day = styled.div`
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

const MainBoard = styled.div`
  width: 600px;
  height: 600px;
  background-color: yellow;
`;

function Level1() {
  const [isBoard, setIsBoard] = useState(false);
  const onOverlayCLick = () => setIsBoard((prev) => !prev);
  return (
    <>
      <Block>
        <Day onClick={onOverlayCLick}></Day>
        <Day></Day>
        <Day></Day>
        <Day></Day>
        <Day></Day>
        <Day></Day>
      </Block>
      <Block>
        <Day></Day>
        <Day></Day>
        <Day></Day>
        <Day></Day>
        <Day></Day>
        <Day></Day>
      </Block>
      {isBoard ? (
        <Overlay onClick={onOverlayCLick}>
          <MainBoard />
        </Overlay>
      ) : null}
    </>
  );
}

export default Level1;
