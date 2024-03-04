import styled from "styled-components";
import Block from "../Block/Block";

export default function ModalRow({ char, output, data }) {
  console.log("char:", char);
  return (
    <StyledModalRow>
      <Block block={char} />
      character: {char} x{output} tiles
    </StyledModalRow>
  );
}
const StyledModalRow = styled.div`
  border: 1px solid black;
  margin-bottom: 0.5rem;
  border-radius: 15px;
  padding: 0.5rem;
`;
