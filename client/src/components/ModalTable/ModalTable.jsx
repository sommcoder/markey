import styled from "styled-components";
import Block from "../Block/Block";

export default function ModalTable({ data, appState, output }) {
  console.log("appState:", appState);
  console.log("TABLE output:", output);

  /*
we will take the App state as a PROP and convert it into an ARRAY and use that array to MAP the ModalRow Components
*/

  return (
    <StyledModalTable>
      {Object.keys(output)
        .sort() // easier to view
        .map((char, i) => {
          // render nothing if character is ' '
          return char === " " ? (
            ""
          ) : (
            <StyledModalBlockContainer key={`${char}${i}`}>
              <Block
                block={char}
                key={`Modal-${char}`}
                delay={i + 1}
                style={data[char].size}
              />
              <StyledBlockTally>x{output[char]}</StyledBlockTally>
            </StyledModalBlockContainer>
          );
        })}
    </StyledModalTable>
  );
}
const StyledModalTable = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
  padding-top: 2rem;
  max-width: ${(props) => props.modalWindowWidth - 50 + "px"};
  align-content: center;
  align-items: center;
  flex-basis: auto;
  flex-direction: row;
  justify-content: center;
  border-top: 1px solid grey;
  border-bottom: 1px solid grey;
`;

const StyledModalBlockContainer = styled.div`
  display: grid;
  min-width: 8rem;
  grid-template-columns: 50% 50%;
  margin-bottom: 0.5rem;
  padding: 0.5rem;
  align-items: center;
  justify-items: center;
  align-items: center;
  justify-items: center;
  align-content: center;
`;

// ideally would want this to the top right of each tile
const StyledBlockTally = styled.span`
  font-size: 2rem;
  align-self: baseline;
  text-align: left;
`;
