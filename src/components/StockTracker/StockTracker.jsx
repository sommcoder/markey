import styled from "styled-components";

export default function StockTracker({ char, rowNum, data }) {
  /*
 
display the current stock based on what has been entered AND set,
This is to be dynamic validation


 
*/

  return (
    <StyledStockTracker rowNum={rowNum}>
      {char === "<==" || char === "ENTER" ? "" : data[char].stock}
    </StyledStockTracker>
  );
}
const StyledStockTracker = styled.span`
  font-style: italic;
  position: absolute;
  top: 2px;
  text-align: right;
  right: 4px;
  font-size: 1rem;
  font-weight: 800;
  z-index: 10;
  color: red;
  height: 1rem;
  width: 1rem;
`;
