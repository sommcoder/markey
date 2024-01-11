import styled from "styled-components";
// import StockTracker from "../StockTracker/StockTracker";

// import { validateInput } from "../../functions/inputValidation";

export default function Key({ data, char }) {
  // Special keys are determined if they are larger than a single char
  if (char.length <= 1) {
    return (
      <StyledKey value={char}>
        <div className="button-text">{char}</div>
        {/* <StockTracker data={data} char={char} /> */}
      </StyledKey>
    );
  } else
    return (
      <StyledKeySpecial value={char}>
        <div className="button-text">{char}</div>
        {/* <StockTracker data={data} char={char} /> */}
      </StyledKeySpecial>
    );
}

const StyledKey = styled.button`
  position: relative;
  text-transform: uppercase;
  border: none;
  font-size: 1.6rem;
  font-weight: bold;
  margin-right: 3px;
  margin-left: 3px;
  width: 3rem;
  height: 5rem;
  background-color: rgb(194, 197, 197);
  color: black;
  text-align: center;
  border-radius: 15%;
  box-shadow: none;

  // DESKTOP/TABLET:
  /* @media (min-width: 800px) {
    width: 5rem;
    height: 7rem;
  } */

  &:hover {
    background-color: rgb(172, 172, 172);
    cursor: pointer;
  }
`;

const StyledKeySpecial = styled(StyledKey)`
  position: relative;
  width: 5.5rem;
  font-size: 1rem;

  // DESKTOP/TABLET:
  /* @media (min-width: 800px) {
     width: 9.5rem;
  } */

  &:hover {
    background-color: rgb(172, 172, 172);
  }
`;
