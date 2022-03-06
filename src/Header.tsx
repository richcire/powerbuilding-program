import styled from "styled-components";

const Wrapper = styled.div`
  padding-top: 80px;
  height: 300px;
  margin-top: 70px;
  width: 300px;
  margin: 0 auto;
`;

const Logo = styled.span`
  font-size: 90px;
`;

const ByMe = styled.span`
  font-size: 20px;
`;

function Header() {
  return (
    <Wrapper>
      <Logo>Power Building Program</Logo>
      <ByMe>by me</ByMe>
    </Wrapper>
  );
}

export default Header;
