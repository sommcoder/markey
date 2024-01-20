import styled from 'styled-components';
// import StockTracker from "../StockTracker/StockTracker";
import { specialKeysArr } from '../KeySet/characterSet';

export default function Key({ data, char, keySetObj }) {
  // Special keys are determined if they are larger than a single char
  console.log('keySetObj:', keySetObj, char);

  // TODO:
  return (
    <StyledKey
      tabIndex={0}
      onFocus={ev => ev.preventDefault()}
      value={char}
      data-special={specialKeysArr.includes(char) ? true : false}
      stock={keySetObj.stock}
      size={keySetObj.size}
      textRow={keySetObj.textRow}
      id={keySetObj.id}
    >
      <StyledKeyText tabIndex={0} className="button-text">
        {char}
      </StyledKeyText>
      {/* <StockTracker data={data} char={char} /> */}
    </StyledKey>
  );
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

  &[data-special='true'] {
    width: 6rem;
    font-size: 1rem;
  }
`;

const StyledKeyText = styled.div`
  overflow-wrap: break-word;
  inline-size: fit-content;
  word-break: break-all;
`;
