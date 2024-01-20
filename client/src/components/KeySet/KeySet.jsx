import Key from '../Key/Key';
import styled from 'styled-components';
import { characterSet, specialKeysArr } from './characterSet';

export default function KeySet({ data }) {
  // TODO: data: is set up to lookup based on the id... we need to aggregate the data and assign each Key component the id's props in alphabetical order
  const keys = Object.keys(data);
  console.log('keys:', keys);
  const values = Object.values(data);
  console.log('values:', values);
  // TODO: the whole point of this is to make it so that it's easier to click keys and use their props to populate the sequence array for input validation and also make it easy to look up items by id
  const keySetObj = {};
  // aggregate the data to be by
  for (let i = 0; i < values.length; i++) {
    keySetObj[values[i].textRow] = {
      marqBlock: values[i].marqBlock,
      id: keys[i],
      size: values[i].size,
      stock: values[i].stock,
    };
  }

  console.log('keySetObj:', keySetObj);
  /*
  { 
    marqBlock: ""
    id: #,
    size: #,
    stock: #,
    textRow: ""
  }
  */

  return (
    <StyledSetContainer>
      {characterSet.map(obj => (
        <StyledKeySetRow key={obj.rowNum}>
          {Object.keys(keySetObj).map(char => (
            <Key
              special={false}
              data={data}
              keySetObj={keySetObj[char]}
              char={char}
              key={`${obj.rowNum}-${char}`}
              rowNum={obj.rowNum}
            />
          ))}
        </StyledKeySetRow>
      ))}
    </StyledSetContainer>
  );
}

const StyledSetContainer = styled.div`
  position: block;
  display: grid;
  /* max-width: 500px; */
  padding-top: 2rem;
  padding-bottom: 2rem;
  width: 100%;
  box-shadow: inset 0px 0px 5px #c1c1c1;
  overflow: hidden;
  z-index: 10;
`;

const StyledKeySetRow = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  justify-content: center;
  margin-bottom: 2px;
`;
