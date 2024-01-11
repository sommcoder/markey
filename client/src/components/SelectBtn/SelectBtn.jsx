import styled from "styled-components";

export default function SelectBtn({
  marqName,
  selectedMarq,
  switchSelectedMarq,
}) {
  function toggleDisplay(ev) {
    ev.preventDefault();
    switchSelectedMarq(marqName);
  }
  /*
   
  the select button toggles WHICH marquee is able to be receive input from the Keyboard component and what the user presses

  -- this will be prodominantly a mobile use case
  -- but will also be useful if the user wishes to add special symbols to the marquee
   
  */

  // TODO: make the selectbtn highlight the table it belongs to. There can only be one selected table
  // TODO: While select btn is enabled, it's respective table is what the keyboard will input into!

  return (
    <StyledSelectBtn
      onClick={toggleDisplay}
      data-id={marqName}
      title="Select Marquee(s) to work with"
    >
      <div className="button-text">{`${marqName} Marquee`}</div>
    </StyledSelectBtn>
  );
}

const StyledSelectBtn = styled.button`
  display: block;
  position: relative;
  margin: 0 auto;
  width: 25rem;
  margin-bottom: 1rem;
`;
