import { doc, getDoc } from "firebase/firestore";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { dataState, ILevel } from "../atoms";
import { db } from "../firebase-config";
import { getDocId } from "../utils";

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
  const [levelDataState, setLevelDataState] = useRecoilState(dataState);

  const getData = async () => {
    const docRefLv1 = doc(db, "level1", getDocId("level1"));
    const docRefLv15 = doc(db, "level1.5", getDocId("levelhalf"));
    const docRefLv2 = doc(db, "level2", getDocId("level2"));
    const docSnap1 = await getDoc(docRefLv1);
    const docSnap15 = await getDoc(docRefLv15);
    const docSnap2 = await getDoc(docRefLv2);
    const snapshot1 = docSnap1.data() as ILevel;
    const snapshot15 = docSnap15.data() as ILevel;
    const snapshot2 = docSnap2.data() as ILevel;
    setLevelDataState((prev) => {
      return {
        ...prev,
        1: snapshot1,
        1.5: snapshot15,
        2: snapshot2,
      };
    });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <Row>
      <Link style={{ textDecoration: "none" }} to="level1">
        <Card>
          <Block>Block1 : 100</Block>
          <Label>Level 1</Label>
        </Card>
      </Link>
      <Link style={{ textDecoration: "none" }} to="level1half">
        <Card>
          <Block>Block1 : 100</Block>
          <Label>Level 1.5</Label>
        </Card>
      </Link>
      <Link style={{ textDecoration: "none" }} to="level2">
        <Card>
          <Block>Block1 : 100</Block>
          <Label>Level 2</Label>
        </Card>
      </Link>
    </Row>
  );
}

export default Home;
