import styled from "styled-components";
import Block from "../Block/Block";

export default function ModalTable({ data, appState, stateOutputObj }) {
  console.log("appState:", appState);
  console.log("MODAL TABLE outputObj:", stateOutputObj);

  return (
    <StyledModalTable>
      {Object.keys(stateOutputObj)
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
              <StyledBlockTally>x{stateOutputObj[char]}</StyledBlockTally>
            </StyledModalBlockContainer>
          );
        })}
    </StyledModalTable>
  );
}
const StyledModalTable = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-basis: auto;
  flex-direction: column;
  max-height: 300px;

  margin: 0 auto;
  padding-top: 2rem;
  max-width: ${({ modalWindowWidth }) => modalWindowWidth - 50 + "px"};
  align-content: center;
  align-items: center;
  justify-content: center;
  border-top: 1px solid grey;
  border-bottom: 1px solid grey;
`;

const StyledModalBlockContainer = styled.div`
  display: flex;
  min-width: 12rem;
  margin-bottom: 0.5rem;
  padding: 0.5rem;
  align-items: center;
  justify-items: center;
  align-content: center;
  justify-content: center;
  gap: 1rem;
`;

// ideally would want this to the top right of each tile
const StyledBlockTally = styled.span`
  font-size: 2rem;
  text-align: left;
  color: black;
`;
