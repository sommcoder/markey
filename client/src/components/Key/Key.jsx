import styled from "styled-components";
// import StockTracker from "../StockTracker/StockTracker";
import { specialKeysArr } from "../KeySet/characterSet";

export default function Key({ data, char, special }) {
  // Special keys are determined if they are larger than a single char
  if (specialKeysArr.includes(char)) {
    return (
      <StyledKeySpecial
        tabIndex={0}
        onFocus={(ev) => ev.preventDefault()}
        value={char}
        data-special={special}
      >
        <StyledKeyText tabIndex={0} className="button-text">
          {char}
        </StyledKeyText>
        {/* <StockTracker data={data} char={char} /> */}
      </StyledKeySpecial>
    );
  } else {
    return (
      <StyledKey
        tabIndex={0}
        value={char}
        onFocus={(ev) => ev.preventDefault()}
      >
        <StyledKeyText tabIndex={0} className="button-text">
          {char}
        </StyledKeyText>
        {/* <StockTracker data={data} char={char} /> */}
      </StyledKey>
    );
  }
}

const StyledKey = styled.button`
  position: relative;
  text-transform: uppercase;
  border: none;
  font-size: 1.6rem;
  font-weight: bold;
  margin-right: 3px;
  margin-left: 3px;
  width: 3rem;
  height: 5rem;
  color: black;
  text-align: center;
  border-radius: 15%;
  box-shadow: none;
  padding: 0;
  display: flex;
  justify-content: center;
`;

const StyledKeySpecial = styled(StyledKey)`
  position: relative;
  width: 6rem;
  font-size: 1rem;
`;

const StyledKeyText = styled.div`
  overflow-wrap: break-word;
  inline-size: fit-content;
  word-break: break-all;
`;
