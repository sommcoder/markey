import styled from "styled-components";
// import StockTracker from "../StockTracker/StockTracker";

export default function Key({ charObj, special }) {
  // console.log("charObj:", charObj);

  return charObj.marqBlock !== " " ? (
    <StyledKey
      tabIndex={-1}
      value={charObj.marqBlock}
      data-special={special ? true : false}
      charObj={charObj}
    >
      <div
        tabIndex={-1}
        className="button-text"
        data-special={special ? true : false}
      >
        {charObj.marqBlock}
      </div>
      {/* <StockTracker charObj={charObj} /> */}
    </StyledKey>
  ) : (
    ""
  );
}

const StyledKey = styled.button`
  position: relative;
  text-transform: uppercase;
  border: none;
  font-weight: bold;
  margin-right: 0.33rem;
  margin-left: 0.33rem;
  width: 3rem;
  height: 5rem;
  color: black;
  text-align: center;
  border-radius: 15%;
  box-shadow: none;
  padding: 0;
  display: flex;
  justify-content: center;

  &[data-special="true"] {
    width: 6rem;
  }
`;
