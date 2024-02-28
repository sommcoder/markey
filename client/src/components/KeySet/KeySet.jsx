import Key from "../Key/Key";
import styled from "styled-components";
import { regularKeysArr, specialKeysArr } from "./characterSet";

export default function KeySet({ data }) {
  return (
    <StyledSetContainer>
      {regularKeysArr.map((row) => (
        <StyledKeySetRow key={row}>
          {row.map((char, i) => (
            <Key
              special={false}
              charObj={data[char]}
              key={`${data[char]}-${i}`}
            />
          ))}
        </StyledKeySetRow>
      ))}
      {specialKeysArr.map((row) => (
        <StyledKeySetRow key={row}>
          {row.map((char, i) => (
            <Key
              special={true}
              charObj={data[char]}
              key={`${data[char]}-${i}`}
            />
          ))}
        </StyledKeySetRow>
      ))}
    </StyledSetContainer>
  );
}

const StyledSetContainer = styled.div`
  display: grid;
  padding-top: 2rem;
  padding-bottom: 2rem;
  width: 100%;
  box-shadow: inset 0px 0px 5px #c1c1c1;
  overflow: hidden;
  z-index: 8;
`;

const StyledKeySetRow = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin-bottom: 2px;
`;
