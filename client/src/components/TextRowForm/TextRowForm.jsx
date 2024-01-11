import styled from "styled-components";

import ErrorMsg from "../ErrorMsg/ErrorMsg";
import SetCurrBtn from "../SetCurrBtn/SetCurrBtn";
import ResetBtn from "../ResetBtn/ResetBtn";
import CompareBtn from "../CompareBtn/CompareBtn";

import setCurrMarquee from "../../functions/setCurrMarquee";

import { forwardRef, useEffect, useRef } from "react";

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
  // NOT state. Just allows for client-side validation via onKeyDown event:
  const inputValidationObj = {
    row0: { values: [], sizes: 0 },
    row1: { values: [], sizes: 0 },
    row2: { values: [], sizes: 0 },
  };
  // tracks the sequence of characters entered through onKeyDown():
  const inputRefsArr = useRef([]);

  function addToRefsArr(el) {
    if (el && !inputRefsArr.current.includes(el)) {
      inputRefsArr.current.push(el);
    }
  }

  function getNextEl(row) {
    if (!row) return 0;
    let currEl = inputRefsArr.current.findIndex(
      (el) => el.dataset.rowid === row
    );
    // if last el, start from the beginning
    return currEl === inputRefsArr.current.length - 1 ? 0 : currEl + 1;
  }

  function validateEntry(ev) {
    let key = ev.key;
    let row = ev.target.dataset.rowid;

    if (key === " ") ev.preventDefault();
    if (key === "Enter") {
      console.log("row:", row);

      let nextEl = getNextEl(row);
      console.log("nextEl:", nextEl);
      switchSelectedRow(`row${nextEl}`);
      // dispatch reducer:
      dispAppState({
        type: "set",
        payload: setCurrMarquee(ev, keysArr, appState, data, marqName),
      });
      return;
    }
    if (key === "Backspace" || key === "Delete") {
      if (inputValidationObj[row].sizes === 0) {
        return;
      }
      // update validation Object:
      inputValidationObj[row].sizes -=
        +data[inputValidationObj[row].values.at(-1)].size;
      inputValidationObj[row].values.pop();
      ev.target.value = inputValidationObj[row].values.join("");
      return;
    }
    if (!data[key]) return;
    // key doesn't exist in data
    // 0.1 = accounts for block border size
    let currBlockSize = +data[key].size + 0.1;
    // Max capacity check:
    // existing width + current block size would be greater than the marqSize
    if (inputValidationObj[row].sizes + currBlockSize > marqSize) {
      ev.target.form[row].animate(
        [
          {
            transform: "translateX(-0.33%)",
            borderColor: "rgb(255, 0, 0)",
          },
          {
            transform: "translateX(0.33%)",
            borderColor: "rgb(255, 0, 0)",
          },
        ],
        { duration: 150, iterations: 3 }
      );
      return;
    }
    // append validation Object:
    inputValidationObj[row].sizes += currBlockSize;
    inputValidationObj[row].values.push(key);
    ev.target.value = inputValidationObj[row].values.join("");
  }

  // when selectedMarq changes, switch selectedRow to nextEl
  useEffect(() => {
    if (selectedMarq === marqName) {
      switchSelectedRow("row0");
    }
  }, [selectedMarq]);

  function handleSelectedRow(ev, row) {
    console.log(" handled Selected row:", row);
    console.log("ev:", ev);
    ev.preventDefault();
    console.log("selectedMarq:", selectedMarq, "marq:", marqName);

    if (selectedMarq === marqName) {
      switchSelectedRow(row);
    }
  }

  return (
    <>
      <form id={formName} ref={ref[marqName]}>
        {keysArr.map((row) => (
          <StyledTextRow
            ref={addToRefsArr}
            form={formName}
            key={`${marqName}-${row}`}
            readOnly
            data-rowid={row}
            type="text"
            name={row}
            selected={
              (selectedMarq === marqName && selectedRow) === row ? true : false
            }
            onClick={(ev) => handleSelectedRow(ev, row)}
            onKeyDown={(ev) => validateEntry(ev)}
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

// CREATE a passive/disabled button state.
/*
 
button should be colored and solid when available and transparent with grey background when not available
 
*/

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
  cursor: pointer;
  border: 2px solid rgb(118, 118, 118);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.07), 0 2px 4px rgba(0, 0, 0, 0.07),
    0 4px 8px rgba(0, 0, 0, 0.07), 0 8px 16px rgba(0, 0, 0, 0.07),
    0 16px 32px rgba(0, 0, 0, 0.07), 0 32px 64px rgba(0, 0, 0, 0.07);

  &:hover {
    background-color: ${(props) =>
      props.selected
        ? "rgba(176, 224, 230, 0.75)"
        : "rgba(176, 224, 230, 0.25)"};
  }
  /* &:focus {
    outline: none;
    background-color: rgba(176, 224, 230, 0.75);
  } */

  outline: none;
  background-color: ${(props) =>
    props.selected ? "rgba(176, 224, 230, 0.75)" : "white"};
`;
