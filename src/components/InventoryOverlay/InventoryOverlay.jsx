import { styled } from "styled-components";

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
   function handleRowChange
  */

  // function handleMenuState() {
  //   // want to be able to close the overlay as soon as user clicks OFF of the overlay
  //   menuState ? toggleMenuState(false) : toggleMenuState(true);
  // }
  function handleRowChange() {
    // just perform some client side validation.
    /*
     
    1) there should be a max and min size in ""
    2) 
     
    */
  }

  return (
    <StyledInventoryOverlay menuState={menuState}>
      <StyledInventoryBox>
        <StyledInventoryHeaderRow>
          <span>Tile</span>
          <span>Stock</span>
          <span>Width</span>
        </StyledInventoryHeaderRow>
        {Object.keys(data).map((char, i) =>
          char !== " " ? (
            <StyledCharContainer
              key={i}
              data-id={data[char].id}
              onChange={handleRowChange}
            >
              <StyledCharBlock>{data[char].marqBlock}</StyledCharBlock>
              <StyledStockInput value={data[char].stock} />
              <StyledWidthInput value={data[char].size} />
            </StyledCharContainer>
          ) : (
            ""
          )
        )}
      </StyledInventoryBox>
    </StyledInventoryOverlay>
  );
}

const StyledInventoryOverlay = styled.div`
  width: 40rem;
  height: 100%;
  background-color: rgba(198, 219, 230, 0.9);
  z-index: 9;
  align-items: center;
  position: absolute;
  ${({ menuState }) =>
    menuState
      ? `
    right: 0rem;
    display: grid;
    opacity: 1;
    `
      : `
    right: -40rem;
    display: none;
    opacity: 0;
    `};
  transition: all 300ms linear;
  overflow-y: scroll;
  margin-top: 12rem;
`;

// TODO: would be great to make a sticky header WITHIN the overlay so that the headers are visible as the users scrolls down
// The ENTIRE box is a form and therefore multiple changes can be made and sent to the server
const StyledInventoryBox = styled.form`
  display: grid;
  padding: 1.5rem;
  grid-template-columns: 1fr;
  justify-items: center;
  row-gap: 0.25rem;
  font-weight: 800;
  font-size: 1.8rem;
`;

const StyledInventoryHeaderRow = styled.div`
  display: grid;
  font-size: 2rem;
  color: black;
  gap: 1rem;
  width: 30rem;
  grid-template-columns: 18rem 4.5rem 4.5rem;
  border-radius: 1rem;
  border: 1px solid black;
  justify-content: center;
  align-content: center;
  justify-items: center;
  align-items: center;
`;

const StyledCharContainer = styled.span`
  display: grid;
  grid-template-columns: auto auto auto;
  border-radius: 1rem;
  justify-content: center;
  align-content: center;
  justify-items: center;
  align-items: center;
  width: 30rem;
`;
const StyledCharBlock = styled.span`
  color: black;
  font-weight: 800;
  font-size: 1.8rem;
  text-overflow: wrap;
  width: 17rem;
  border: 0.1rem solid black;
  height: 100%;
  border-radius: 1rem;
  display: grid;
  align-content: center;
  justify-content: center;
  justify-items: center;
`;
const StyledStockInput = styled.input`
  display: grid;
  align-content: center;
  justify-content: center;
  width: 4.5rem;
  height: 3rem;
  font-weight: 800;
  font-size: 1.4rem;
  text-align: center;
  border-radius: 1rem;
  border: none;
`;
const StyledWidthInput = styled.input`
  display: grid;
  align-content: center;
  justify-content: center;
  width: 4.5rem;
  height: 3rem;
  font-weight: 800;
  font-size: 1.4rem;
  text-align: center;
  border-radius: 1rem;
  border: none;
`;
