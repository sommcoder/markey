import { styled } from "styled-components";
import InventoryHeaderRow from "../InventoryHeaderRow/InventoryHeaderRow";

export default function InventoryOverlay({ data, menuState, toggleMenuState }) {
  console.log("data:", data);

  /*
   
  1) have values a-z in one section
  2) have everything else in another
  3) have special keys in their own section

  sections will have divders

  - each character tile will have a corresponding stock and width input field.
  the container is in fact a form component which will send requests/mutations on submit.

  - will need an onChange handler for this?

  - Should probably create a "add new tile" feature but maybe we just complete what we have here!!

TODO: will have to find a way to allow the user to view and update SIZE by inches and then the app will convert and save to DB with the proper relative units based on Marq size
   
  */

  // function handleMenuState() {
  //   // want to be able to close the overlay as soon as user clicks OFF of the overlay
  //   menuState ? toggleMenuState(false) : toggleMenuState(true);
  // }

  return (
    <StyledInventoryOverlay>
      <StyledInventoryBox>
        <InventoryHeaderRow />
        {Object.keys(data.regular).map((char, i) =>
          char !== " " ? (
            <StyledCharContainer key={i}>
              <StyledCharBlock>{data.regular[char].marqBlock}</StyledCharBlock>
              <StyledStockInput value={data.regular[char].stock} />
              <StyledWidthInput value={data.regular[char].size} />
            </StyledCharContainer>
          ) : (
            ""
          )
        )}
        {Object.keys(data.special).map((char, i) => (
          <StyledCharContainer key={i}>
            <StyledCharBlock>{data.special[char].marqBlock}</StyledCharBlock>
            <StyledStockInput value={data.special[char].stock} />
            <StyledWidthInput value={data.special[char].size} />
          </StyledCharContainer>
        ))}
      </StyledInventoryBox>
    </StyledInventoryOverlay>
  );
}

const StyledInventoryOverlay = styled.div`
  width: 65%;
  height: 100vh;
  background-color: lightgrey;
  opacity: 0.8;
  z-index: 9;
  display: grid;
  align-items: center;
  position: fixed;
  right: 0;
  top: 0;
  overflow-y: scroll;
  // want to slowly transition from right
`;

// The ENTIRE box is a form and therefore multiple changes can be made and sent to the server
const StyledInventoryBox = styled.form`
  opacity: 1;
  display: grid;
  grid-template-columns: 1fr;
  justify-items: center;
  border: 1px solid black;
`;
const StyledCharContainer = styled.span`
  display: grid;
  grid-template-columns: auto auto auto;
  border-radius: 1rem;
  border: 1px solid black;
  justify-content: center;
  align-items: center;
  width: 30rem;
`;
const StyledCharBlock = styled.span`
  color: black;
  font-size: 1.6rem;
  padding-right: 2rem;
  text-overflow: wrap;
  width: 6rem;
  background-color: white;
  height: 100%;
  border-radius: 1rem;
  justify-items: center;
`;
const StyledStockInput = styled.input`
  width: 4.5rem;
  height: 3rem;
  font-size: 1.6rem;
  text-align: center;
  border-radius: 1rem;
  border: none;
`;
const StyledWidthInput = styled.input`
  width: 4.5rem;
  height: 3rem;
  font-size: 1.6rem;
  text-align: center;
  border-radius: 1rem;
  border: none;
`;
