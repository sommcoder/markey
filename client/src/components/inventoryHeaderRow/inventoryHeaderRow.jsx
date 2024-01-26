import { styled } from "styled-components";

export default function inventoryHeaderRow() {
  /*
 
- left align text
 
*/

  return (
    <StyledinventoryHeaderRow>
      <span>Tile</span>
      <span>Stock</span>
      <span>Width</span>
    </StyledinventoryHeaderRow>
  );
}

const StyledinventoryHeaderRow = styled.div`
  display: flex;
  font-size: 2rem;
  color: black;
  gap: 1rem;
`;
