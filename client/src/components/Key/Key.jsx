import styled from 'styled-components';
import StockTracker from '../StockTracker/StockTracker';

export default function Key({ letter }) {
  function handleKeyClick(ev) {
    ev.preventDefault();
    console.log('ev:', ev);
  }

  // TODO: add the StockTracker component to the key component.
  // TODO: ensure the StockTracker component is styled nicely and that each stocktracker will display the REMAINING stock of every letter that has been submitted AND also that has currently been entered but NOT submitted.

  // We might need to do a useRef...

  // the values in the input fields IS NOT state.. therefore it does seem like this would be an appropriate way to use this hook...

  // we'd have the useRef values, populate them with the values of the Keys that are clicked.. perform the same client side validation and ensure that only the marquees selected have their input rows populated.

  /*
 
1) We need to access the input field rows of each of the marquees

2) We need to be 
 
*/

  // Special keys are determined if they are larger than a single character
  if (letter.length <= 1) {
    return (
      <StyledKey onClick={ev => handleKeyClick(ev)} value={letter}>
        <div className="button-text">{letter}</div>
        <StockTracker letter={letter} />
      </StyledKey>
    );
  } else
    return (
      <StyledKeySpecial nClick={ev => handleKeyClick(ev)} value={letter}>
        <div className="button-text">{letter}</div>
        <StockTracker letter={letter} />
      </StyledKeySpecial>
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
  background-color: rgb(194, 197, 197);
  color: black;
  text-align: center;
  border-radius: 15%;
  box-shadow: none;

  // DESKTOP/TABLET:
  /* @media (min-width: 800px) {
    width: 5rem;
    height: 7rem;
  } */

  &:hover {
    background-color: rgb(172, 172, 172);
    cursor: pointer;
  }
`;

const StyledKeySpecial = styled(StyledKey)`
  position: relative;
  width: 5.5rem;
  font-size: 1rem;

  // DESKTOP/TABLET:
  /* @media (min-width: 800px) {
     width: 9.5rem;
  } */

  &:hover {
    background-color: rgb(172, 172, 172);
  }
`;
