import styled from "styled-components";

export default function HamburgerMenu() {
  return (
    <StyledHamburgerMenu>
      <span></span>
      <span></span>
      <span></span>
    </StyledHamburgerMenu>
  );
}
const StyledHamburgerMenu = styled.span`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 30px;
  height: 24px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  box-sizing: border-box;

  &:hover {
    filter: brightness(85%);
  }

  span {
    height: 3px;
    background-color: white;
    border-radius: 5px;
    width: 30px;
  }

  /* @media (min-width: 600px) {
    // hamburger menu disappears at Tablet+
    // and the Download Button and Sidebar Appear
    display: none;
  } */
`;
