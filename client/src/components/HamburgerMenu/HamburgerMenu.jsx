import { useRef } from "react";
import styled from "styled-components";

export default function HamburgerMenu({ menuState, toggleMenuState }) {
  function handleMenuClick() {
    toggleMenuState((prevState) => !prevState);
  }

  return (
    <StyledHamburgerMenu onClick={handleMenuClick} menuState={menuState}>
      <span className="top-line"></span>
      <span className="middle-line"></span>
      <span className="bottom-line"></span>
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
  position: relative;

  box-sizing: border-box;

  &:hover {
    filter: brightness(85%);
  }

  .clicked {
    z-index: 20;
  }

  span {
    position: relative;
    height: 3px;
    background-color: black;
    border-radius: 5px;
    width: 30px;
    z-index: 20;

    transition: all linear 300ms;
    ${({ menuState }) =>
      menuState &&
      `
  &.top-line {
    transform: rotate(45deg) translateY(0.65rem) translateX(0.5rem);
  }

   &.middle-line {
    transform: scaleX(0);
  }

  &.bottom-line {
    transform: rotate(-45deg) translateY(-0.65rem) translateX(0.5rem);
  }


  `}
  }
`;

/*
 
1) onClick: top line rotates down
2) bottom line rotates up
3) middle line fades its opacity
4) the whole component increases in z-index so it is clickable as a close button
 
*/
