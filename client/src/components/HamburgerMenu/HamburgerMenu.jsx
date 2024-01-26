import { useRef } from "react";
import styled from "styled-components";

export default function HamburgerMenu({ menuState, toggleMenuState }) {
  const lineRefs = useRef([]);

  function handleMenuClick() {
    menuState ? toggleMenuState(false) : toggleMenuState(true);
  }

  return (
    <StyledHamburgerMenu onClick={handleMenuClick} clicked={menuState}>
      {[0, 1, 2].map((el, i) => (
        <span key={i} ref={(el) => (lineRefs.current[i] = el)}></span>
      ))}
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
  }

  .clicked:nth-child(0) {
    transform: rotate(45deg);
    transition: ease-out 0.5s;
  }
  .clicked:nth-child(1) {
    transform: scale(0.1);
    transition: ease-out 0.5s;
  }
  .clicked:nth-child(2) {
    transform: rotate(135deg);
    transition: ease-out 0.5s;
  }
`;

/*
 
1) onClick: top line rotates down
2) bottom line rotates up
3) middle line fades its opacity
4) the whole component increases in z-index so it is clickable as a close button
 
*/
