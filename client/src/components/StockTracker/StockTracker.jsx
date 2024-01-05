import styled from "styled-components";
import data from "../../data/blockData.json";

export default function StockTracker({ letter, rowNum }) {
  /*
 
display the current stock based on what has been entered AND set,
This is to be dynamic validation



TODO: Maybe we create a special key the enables the "special keys" that will appear below the standard QWERTY/Numbers
 
*/

  return (
    <StyledStockTracker rowNum={rowNum}>
      {letter === "<==" || letter === "ENTER" ? "" : data[letter].stock}
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
