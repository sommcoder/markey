import styled from "styled-components";
import HamburgerMenu from "../HamburgerMenu/HamburgerMenu";

export default function NavBar() {
  return (
    <StyledNavBar>
      <StyledHeader>
        <img
          src="/mar-key logo.svg"
          style={{
            height: "6rem",
            width: "30rem",
          }}
        />
      </StyledHeader>
      <HamburgerMenu />
    </StyledNavBar>
  );
}

const StyledNavBar = styled.nav`
  align-items: center;
  position: relative;
  top: 0; /* required */
  z-index: 4;
  width: 100%;
  font-size: 4rem;
  font-weight: 650;
  background-color: white;
  margin: 0rem auto 1rem auto;
  text-align: center;
  padding-bottom: 3rem;
  border-bottom: 0.1rem solid lightgrey;
  height: 30px;
  box-shadow: 0 2px 4px -1px rgba(0, 0, 0, 0.25);
`;

const StyledHeader = styled.header`
  text-align: center;
  line-height: normal; // centers vertically
`;
