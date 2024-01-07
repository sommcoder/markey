import Key from "../Key/Key";
import styled from "styled-components";
import { characterSet } from "./characterSet";

export default function Keyboard() {
  return (
    <StyledKeyboardContainer>
      {characterSet.map((obj) => (
        <StyledKeyboardRow key={obj.rowNum}>
          {obj.characters.map((char) => (
            <Key
              char={char}
              rowNum={obj.rowNum}
              key={`${obj.rowNum}-${char}`}
            />
          ))}
        </StyledKeyboardRow>
      ))}
    </StyledKeyboardContainer>
  );
}

const StyledKeyboardContainer = styled.div`
  margin: 0 auto;
  position: sticky;
  display: grid;
  /* max-width: 500px; */
  padding-top: 2rem;
  padding-bottom: 2rem;
  width: 100%;
  -webkit-box-shadow: inset 0px 0px 5px #c1c1c1;
  -moz-box-shadow: inset 0px 0px 5px #c1c1c1;
  box-shadow: inset 0px 0px 5px #c1c1c1;
  overflow: hidden;
`;

const StyledKeyboardRow = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  margin-bottom: 2px;
`;
