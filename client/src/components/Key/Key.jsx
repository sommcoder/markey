import styled from "styled-components";
// import StockTracker from "../StockTracker/StockTracker";

export default function Key({ charObj, special }) {
  return (
    <StyledKey
      tabIndex={-1}
      data-special={special}
      // data- converts to string
      charObj={charObj}
      data-id={charObj.id}
      // id will now be used to look up for keydown events
    >
      <div tabIndex={-1} className="button-text" data-special={special}>
        {charObj.marqBlock}
      </div>
      {/* <StockTracker charObj={charObj} /> */}
    </StyledKey>
  );
}

const StyledKey = styled.button`
  text-transform: uppercase;
  border: none;
  font-weight: bold;
  margin-right: 0.33rem;
  margin-left: 0.33rem;
  width: 3rem;
  height: 5rem;
  color: black;
  text-align: center;
  border-radius: 15%; // TODO: change to rem
  box-shadow: none;
  padding: 0;
  display: flex;
  justify-content: center;
  opacity: 1;

  &[data-special="true"] {
    width: 6rem;
  }
`;
