import { useState } from "react";
import { styled } from "styled-components";

export default function InformationBtn() {
  const [infoTooltip, toggleInfoTooltip] = useState(false);

  function handleHover() {
    toggleInfoTooltip((prevState) => !prevState);
  }

  return (
    <>
      {infoTooltip ? (
        <StyledTooltip infoTooltip onMouseLeave={handleHover}>
          1) Select a marquee
          <br />
          <br />
          2) Enter your desired message per row
          <br />
          <br />
          3) Fill out each marquee
          <br />
          <br />
          4) Validation is based on your block's stock and width
          <br />
          <br />
          5) Set Marquee produces your block tally
          <br />
          <br />
          6) Adjust block stock & width in the menu
        </StyledTooltip>
      ) : (
        ""
      )}
      <StyledInformationBtn onMouseEnter={handleHover}>i</StyledInformationBtn>
    </>
  );
}

const StyledInformationBtn = styled.span`
  height: 2rem;
  width: 2rem;
  background-color: white;
  border: 1px solid black;
  border-radius: 50%;
  align-items: center;
  display: flex;
  position: relative;
  font-size: 1.6rem;
  color: black;
  justify-content: center;
  &:hover {
    cursor: pointer;
  }
`;

const StyledTooltip = styled.div`
  position: absolute;
  display: flex;
  width: 30rem;
  gap: 0.5rem;
  font-size: 1.6rem;
  color: black;
  border: 0.1rem black solid;
  background-color: ${({ infoTooltip }) =>
    infoTooltip ? "rgba(255, 255, 255, 0.9)" : "rgba(255, 255, 255, 0)"};
  border-radius: 2rem;
  padding: 1.5rem;
  z-index: 5;
  text-align: left;
  top: 120%;
  left: 30%;
  transition: background-color 500ms ease-in;

  &::after {
    content: "";
    position: absolute;
    top: -4.5%;
    left: 6%;
    margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: transparent transparent #000000 transparent;
  }

  &:hover {
    cursor: pointer;
  }
`;
