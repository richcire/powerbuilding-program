import { Link } from "react-router-dom";
import styled from "styled-components";

const Row = styled.div`
  display: flex;
  justify-content: center;
`;
const Card = styled.div`
  width: 440px;
  height: 500px;
  margin: 100px;
  border-radius: 20px;
  font-size: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  padding-top: 150px;
  gap: 70px;
  background-color: #353b48;
  color: #dcdde1;
  box-shadow: 10px 5px 5px rgba(0, 0, 0, 0.5);
`;

const Block = styled.div``;

const Label = styled.div`
  position: absolute;
  bottom: 50px;
`;
function Home() {
  return (
    <Row>
      <Link style={{ textDecoration: "none" }} to="level1">
        <Card>
          <Block>Block1 : 100</Block>
          <Block>Block2 : 200</Block>
          <Label>Level 1</Label>
        </Card>
      </Link>
      <Link style={{ textDecoration: "none" }} to="level1half">
        <Card>
          <Block>Block1 : 100</Block>
          <Block>Block2 : 200</Block>
          <Label>Level 1.5</Label>
        </Card>
      </Link>
      <Link style={{ textDecoration: "none" }} to="level2">
        <Card>
          <Block>Block1 : 100</Block>
          <Block>Block2 : 200</Block>
          <Label>Level 2</Label>
        </Card>
      </Link>
    </Row>
  );
}

export default Home;
