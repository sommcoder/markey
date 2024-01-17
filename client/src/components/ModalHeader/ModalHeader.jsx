import styled from "styled-components";

export default function ModalHeader() {
  return (
    <StyledModalHeader>
      Tiles needed for your desired display:
    </StyledModalHeader>
  );
}
const StyledModalHeader = styled.h3`
  display: block;
  text-overflow: wrap;
  padding: 2rem;
  font-weight: 800;
  font-size: 2rem;
  color: black;
`;
