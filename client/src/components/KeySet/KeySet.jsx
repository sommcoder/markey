import Key from "../Key/Key";
import styled from "styled-components";
import { characterSet } from "./characterSet";

export default function KeySet({ data }) {
  return (
    <StyledSetContainer>
      {characterSet.map((obj) => (
        <StyledKeySetRow key={obj.rowNum}>
          {obj.characters.map((char) => (
            <Key
              data={data}
              char={char}
              rowNum={obj.rowNum}
              key={`${obj.rowNum}-${char}`}
            />
          ))}
        </StyledKeySetRow>
      ))}
    </StyledSetContainer>
  );
}

const StyledSetContainer = styled.div`
  margin: 2rem;
  position: block;
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

const StyledKeySetRow = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  margin-bottom: 2px;
`;
