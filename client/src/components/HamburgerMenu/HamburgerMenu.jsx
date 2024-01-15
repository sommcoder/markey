import styled from "styled-components";

export default function HamburgerMenu() {
  function handleMenuClick() {
    // get refs to animate the span's into an x the is on TOP of the overlay
  }
  return (
    <StyledHamburgerMenu onClick={(ev) => handleMenuClick(ev)}>
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

  box-sizing: border-box;

  &:hover {
    filter: brightness(85%);
  }

  span {
    height: 3px;
    background-color: black;
    border-radius: 5px;
    width: 30px;
  }

  /* @media (min-width: 600px) {
    // hamburger menu disappears at Tablet+
    // and the Download Button and Sidebar Appear
    display: none;
  } */
`;
