import styled from "styled-components";

import ErrorMsg from "../ErrorMsg/ErrorMsg";
import SetCurrBtn from "../SetCurrBtn/SetCurrBtn";
import ResetBtn from "../ResetBtn/ResetBtn";
import CompareBtn from "../CompareBtn/CompareBtn";

import { useRef } from "react";

export default function TextRowForm({
  data,
  appState,
  rowState,
  dispRowState,
  initMarqRowState,
  keysArr,
  marqName,
  marqSize,
  formName,
  selectedMarq,
}) {
  console.log("TEXTFORM - data:", data);
  /*
  #component description:
  - Live input validation
  - Checks Data.json for valid entries
  - applies error animation in validateEntry()
  */

  const inputRefsArr = useRef([]);
  // TODO: looking into forwarding refs to other/multiple components

  // forward each textrow ref UP to the Marquee component.
  // on state change of selectedMarq, useEffect will apply a focus event on the FIRST text row

  // populates the refArray on render
  const addToRefsArr = (el) => {
    if (el && !inputRefsArr.current.includes(el)) inputRefsArr.current.push(el);
  };

  const inputValidationObj = {
    row0: { values: [], sizes: 0 },
    row1: { values: [], sizes: 0 },
    row2: { values: [], sizes: 0 },
  };

  function validateEntry(ev) {
    let key = ev.key;
    let row = ev.target.dataset.rowid;

    if (key === " ") ev.preventDefault();
    if (key === "Enter") {
      ev.preventDefault(); // don't submit
      return;
      // maybe a more elegent solution would be that enter will focus onto the next line and after the LAST input field, the focus will be on the SET button (or more accurately, whichever button is enabled)
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
    // 0.1 = block border size!
    let currBlockSize = +data[key].size + 0.1;

    // Max capacity check:
    if (inputValidationObj[row].sizes + currBlockSize > marqSize) {
      inputRefsArr.current[keysArr.indexOf(row)].animate(
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
    return;
  }

  if (selectedMarq) {
    console.log("inputRefsArr:", inputRefsArr);

    inputRefsArr.current[0].focus();
    // inputRefsArr.current.focus();
  }

  return (
    <>
      <form id={formName}>
        {keysArr.map((row) => (
          <StyledTextRow
            key={`${marqName}-${row}`}
            readOnly
            ref={addToRefsArr}
            data-rowid={row}
            type="text"
            name={row}
            onKeyDown={validateEntry}
          />
        ))}
      </form>
      <SetCurrBtn
        rowState={rowState}
        formName={formName}
        keysArr={keysArr}
        dispRowState={dispRowState}
      />
      <CompareBtn
        rowState={rowState}
        formName={formName}
        keysArr={keysArr}
        dispRowState={dispRowState}
      />
      <ResetBtn
        formName={formName}
        keysArr={keysArr}
        dispRowState={dispRowState}
        initMarqRowState={initMarqRowState}
      />
      {appState[marqName].isError === true ? <ErrorMsg /> : ""}
    </>
  );
}

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
    background-color: rgba(176, 224, 230, 0.25);
  }
  &:focus {
    outline: none;
    background-color: rgba(176, 224, 230, 0.75);
  }
`;
