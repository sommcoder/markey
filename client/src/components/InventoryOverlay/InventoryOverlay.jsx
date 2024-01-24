import { styled } from "styled-components";

export default function InventoryOverlay() {
  return <StyledInventoryOverlay></StyledInventoryOverlay>;
}

const StyledInventoryOverlay = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: lightgrey;
`;
