import { useLocation } from "react-router";
import styled from "styled-components";

const Square = styled.div`
  border: 2px solid black;
`;

function Day() {
  const location = useLocation();
  const [, levelIndex, weekIndex] = location.pathname.split("/");
  return <Square></Square>;
}

export default Day;
