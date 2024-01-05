import Key from "../Key/Key";
import styled from "styled-components";
import { letterSet, specialLetterSet } from "./letterSet";
import { useState } from "react";

export default function Keyboard(props) {
  const [specialKeys, toggleSpecialKeys] = useState(false);

  function handleSpecialKeys(ev) {
    ev.preventDefault();
    specialKeys ? toggleSpecialKeys(false) : toggleSpecialKeys(true);
  }

  return (
    <StyledKeyboardContainer>
      {letterSet.map((obj) => (
        <StyledKeyboardRow key={obj.rowNum}>
          {obj.letters.map((ltr) => (
            <Key
              letter={ltr}
              rowNum={obj.rowNum}
              key={`${obj.rowNum}-${ltr}`}
            />
          ))}
        </StyledKeyboardRow>
      ))}
      <StyledSpecialButton onClick={(ev) => handleSpecialKeys(ev)}>
        special characters
      </StyledSpecialButton>
      {specialKeys
        ? specialLetterSet.map((obj) => (
            <StyledKeyboardRow key={obj.rowNum}>
              {obj.letters.map((ltr) => (
                <Key
                  letter={ltr}
                  rowNum={obj.rowNum}
                  key={`${obj.rowNum}-${ltr}`}
                />
              ))}
            </StyledKeyboardRow>
          ))
        : ""}
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

const StyledSpecialButton = styled.button`
  margin: 1rem auto 1rem auto;
  width: 20rem;
`;
