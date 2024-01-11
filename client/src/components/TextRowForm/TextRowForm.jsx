import styled from "styled-components";

import ErrorMsg from "../ErrorMsg/ErrorMsg";
import SetCurrBtn from "../SetCurrBtn/SetCurrBtn";
import ResetBtn from "../ResetBtn/ResetBtn";
import CompareBtn from "../CompareBtn/CompareBtn";

import { forwardRef, useEffect } from "react";

export default forwardRef(function TextRowForm(
  {
    data,
    appState,
    dispAppState,
    keysArr,
    marqName,
    marqSize,
    formName,
    selectedMarq,
    selectedRow,
    switchSelectedRow,
  },
  ref
) {
  // when selectedMarq changes, switch selectedRow to nextEl
  useEffect(() => {
    if (selectedMarq === marqName) {
      switchSelectedRow(0);
    }
  }, [selectedMarq]);

  return (
    <>
      <form id={formName} ref={ref[marqName]}>
        {keysArr.map((row) => (
          <StyledTextRow
            form={formName}
            key={`${marqName}-${row}`}
            readOnly
            data-rowid={row}
            type="text"
            name={row}
            selected={
              selectedMarq === marqName && selectedRow === row ? true : false
            }
            onClick={(ev) => ev.preventDefault()}
            onKeyDown={(ev) => ev.preventDefault()}
          />
        ))}
      </form>
      <SetCurrBtn
        data={data}
        marqName={marqName}
        formName={formName}
        keysArr={keysArr}
        appState={appState}
        dispAppState={dispAppState}
      />
      <CompareBtn
        data={data}
        marqName={marqName}
        formName={formName}
        keysArr={keysArr}
        appState={appState}
        dispAppState={dispAppState}
      />
      <ResetBtn
        data={data}
        formName={formName}
        marqName={marqName}
        keysArr={keysArr}
        appState={appState}
        dispAppState={dispAppState}
      />
      {appState[marqName].isError === true ? <ErrorMsg /> : ""}
    </>
  );
});

// TODO: CREATE a passive/disabled button state. button should be colored and solid when available and transparent with grey background when not available

const StyledTextRow = styled.input`
  height: 3rem;
  border-radius: 7px;
  align-items: center;
  display: block;
  text-align: center;
  width: 350px;
  margin: 0 auto;
  text-transform: uppercase;
  font-size: 1.6rem;
  font-weight: bold;
  z-index: 1;
  cursor: default;

  border: 2px solid rgb(118, 118, 118);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.07),
    0 4px 8px rgba(0, 0, 0, 0.07), 0 8px 16px rgba(0, 0, 0, 0.07),
    0 16px 32px rgba(0, 0, 0, 0.07), 0 32px 64px rgba(0, 0, 0, 0.07);

  /* &:focus {
    outline: none;
    background-color: rgba(176, 224, 230, 0.75);
  } */

  outline: none;
  background-color: ${(props) =>
    props.selected ? "rgba(176, 224, 230, 0.75)" : "white"};
`;
