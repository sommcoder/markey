import styled from "styled-components";
import HamburgerMenu from "../HamburgerMenu/HamburgerMenu";

export default function NavBar() {
  return (
    <StyledNavBar>
      <StyledHeader
        src="/mar-key logo.svg"
        style={{
          height: "6rem",
          width: "30rem",
        }}
      />
      <HamburgerMenu />
    </StyledNavBar>
  );
}

const StyledNavBar = styled.nav`
  align-items: center;
  position: relative;
  display: block;
  z-index: 4;
  width: 100%;
  font-size: 4rem;
  font-weight: 650;
  background-color: white;
  margin: 0rem auto 2rem auto;
  text-align: center;
  border-bottom: 0.1rem solid lightgrey;
  height: 6rem;
  box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.25);
`;

const StyledHeader = styled.img`
  height: 100%;
`;
