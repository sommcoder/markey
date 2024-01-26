import styled from "styled-components";
// import StockTracker from "../StockTracker/StockTracker";

export default function Key({ charObj, special }) {
  // console.log("charObj:", charObj);

  // better to add the { } in the Key, so that they appear in input fields and can then be processed by setCurrMarquee
  return charObj.marqBlock !== " " ? (
    <StyledKey
      tabIndex={-1}
      value={special ? `{${charObj.marqBlock}}` : charObj.marqBlock}
      data-special={special ? "true" : ""} // data- converts to string, can't use bool
      charObj={charObj}
    >
      <div
        tabIndex={-1}
        className="button-text"
        data-special={special ? "true" : ""}
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
  opacity: 1;

  &[data-special="true"] {
    width: 6rem;
  }
`;
