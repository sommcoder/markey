import styled from "styled-components";

import ErrorMsg from "../ErrorMsg/ErrorMsg";
import ResetBtn from "../ResetBtn/ResetBtn";

import { forwardRef, useEffect } from "react";

export default forwardRef(function TextRowForm(
  {
    data,
    appState,
    dispAppState,
    keysArr,
    marqName,
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

  function handleClick(ev) {
    ev.preventDefault();
    if (selectedMarq === marqName) {
      switchSelectedRow(0);
    }
    // switch selected row to clicked row:
    switchSelectedRow(+ev.target.name);
  }

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
            isSelected={
              selectedMarq === marqName && selectedRow === row ? true : false
            }
            marqSelected={selectedMarq === marqName}
            onClick={(ev) => handleClick(ev)}
            onKeyDown={(ev) => ev.preventDefault()}
            onBlur={(ev) => ev.preventDefault()}
          />
        ))}
      </form>
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
  user-select: none;
  cursor: ${(props) => (props.marqSelected ? "pointer" : "default")};
  -webkit-user-select: none;

  border: 2px solid rgb(118, 118, 118);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.07),
    0 4px 8px rgba(0, 0, 0, 0.07), 0 8px 16px rgba(0, 0, 0, 0.07),
    0 16px 32px rgba(0, 0, 0, 0.07), 0 32px 64px rgba(0, 0, 0, 0.07);

  &:hover {
    background-color: ${(props) =>
      props.marqSelected ? "rgba(176, 224, 230, 0.473)" : ""};
  }

  outline: none;
  background-color: ${(props) =>
    props.isSelected ? "rgba(176, 224, 230, 0.75)" : "white"};
`;
