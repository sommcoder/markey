import styled from "styled-components";

import { forwardRef, useEffect, useState } from "react";

export default forwardRef(function TextRowForm(
  {
    appState,
    marqName,
    formName,
    marqSize,
    selectedMarq,
    selectedRow,
    switchSelectedRow,
    inputValidationObj,
  },
  ref
) {
  const [rowState, setRowState] = useState({
    0: false,
    1: false,
    2: false,
  });
  function handleClick(ev) {
    // switch selected row to clicked row (convert to number):
    if (selectedMarq === marqName) switchSelectedRow(+ev.target.name);
  }
  // when selectedMarq changes, switch selectedRow to nextEl
  useEffect(() => {
    if (selectedMarq === marqName) switchSelectedRow(0);
  }, [selectedMarq]);

  /*
   
  - what we want is to clear the text row after the app row is set.
  - 
   
  */
  useEffect(() => {}, [appState]);
  // input rows are now adjusted based on the inputValidationState in App

  return (
    <form id={formName} ref={ref[marqName]}>
      {Object.keys(inputValidationObj[marqName]).map((row) => {
        return (
          <StyledTextRow
            form={formName}
            key={`${marqName}-${row}`}
            readOnly
            data-rowid={row}
            type="text"
            name={row}
            isselected={
              selectedMarq === marqName && selectedRow == row ? true : false
            }
            value={inputValidationObj[marqName][row].values.join("")}
            marqSize={marqSize}
            marqSelected={selectedMarq === marqName}
            onClick={(ev) => handleClick(ev)}
            onKeyDown={(ev) => ev.preventDefault()}
            onBlur={(ev) => ev.preventDefault()}
          />
        );
      })}
    </form>
  );
});

const StyledTextRow = styled.input`
  height: 3rem;
  border-radius: 7px;
  align-items: center;
  display: block;
  text-align: center;
  width: ${({ marqSize }) =>
    marqSize * 0.95 + "rem" ? marqSize * 0.95 + "rem" : "350px"};
  margin: 0 auto;
  text-transform: uppercase;
  font-size: 1.6rem;
  font-weight: bold;
  z-index: 1;
  user-select: none;
  cursor: ${(props) => (props.marqSelected ? "text" : "default")};
  -webkit-user-select: none;

  border: 2px solid rgb(118, 118, 118);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.07),
    0 4px 8px rgba(0, 0, 0, 0.07), 0 8px 16px rgba(0, 0, 0, 0.07),
    0 16px 32px rgba(0, 0, 0, 0.07), 0 32px 64px rgba(0, 0, 0, 0.07);

  &:hover {
    background-color: ${(props) =>
      props.marqselected ? "rgba(176, 224, 230, 0.473)" : ""};
  }

  outline: none;
  background-color: ${(props) =>
    props.isselected ? "rgba(176, 224, 230, 0.75)" : "white"};
`;
