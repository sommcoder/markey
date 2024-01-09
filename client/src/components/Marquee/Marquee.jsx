import { useEffect, useReducer, useState } from "react";
import TextRowForm from "../TextRowForm/TextRowForm.jsx";
import Block from "../Block/Block.jsx";
import styled, { keyframes } from "styled-components";
import SelectBtn from "../SelectBtn/SelectBtn.jsx";

export default function Marquee({
  data,
  appState,
  dispAppState,
  marqName,
  marqSize,
  selectedMarqObj,
  switchSelectedMarq,
}) {
  /*
  !component description:
  - appState tracks LETTERS and QUANTITY for the modal output
  - marqState tracks INPUT and THEIR SIZE for rending the Block components dynamically
  */
  const marqWidth = marqSize + "rem";

  // for mapping the Block components:
  const initMarqRowState = {
    view: {
      row0: [], // [ [value, size], [value, size], etc]
      row1: [],
      row2: [],
    },
    output: {}, // { ltr: #, ltr: # }
  };

  // input is what we render as Block components
  // output is an OBJECT of each ltr and the count of its appearance

  const reducer = (state, action) => {
    if (!action.payload) return state;
    console.log("state:", state);
    console.log("action.payload:", action.payload);
    switch (action.type) {
      case "set": {
        // updates the Marquee UI:
        return { ...state, ...action.payload };
      }
      default: {
        return state;
      }
    }
  };

  const [rowState, dispRowState] = useReducer(reducer, initMarqRowState);
  ///////////////////////////////////////////
  const keysArr = Object.keys(initMarqRowState.view);

  // !LEGEND:
  // row = row0, row1, row2
  // row[i] = the index of the letter

  // rows are mapped from keysArr
  // blocks are mapped from rowState.view[row]

  console.log("rowState:", rowState);

  return (
    <StyledMarquee
      marqName={marqName}
      data-active={selectedMarqObj[marqName] ? "true" : "false"}
    >
      <SelectBtn
        keysArr={keysArr}
        marqName={marqName}
        selectedMarqObj={selectedMarqObj}
        switchSelectedMarq={switchSelectedMarq}
      />
      {keysArr.map((rowName) => (
        <StyledMarqueeRow marqWidth={marqWidth} key={`${marqName}-${rowName}`}>
          {rowState.view[rowName].length > 0
            ? rowState.view[rowName].map((blockKey, i) => (
                <Block
                  key={`${marqName}-${rowName}-${i}`}
                  block={blockKey[0]}
                  style={blockKey[1]}
                  delay={i + 1}
                />
              ))
            : ""}
        </StyledMarqueeRow>
      ))}
      <TextRowForm
        data={data}
        formName={`${marqName}-Form`}
        appState={appState}
        dispRowState={dispRowState}
        dispAppState={dispAppState}
        marqName={marqName}
        keysArr={keysArr}
        marqSize={marqSize}
        rowState={rowState}
        initMarqRowState={initMarqRowState}
        selectedMarqObj={selectedMarqObj}
        switchSelectedMarq={switchSelectedMarq}
      />
    </StyledMarquee>
  );
}

const fadeInAnimation = keyframes`
     0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
`;

const linearGradientMove = keyframes`
  100% {
    background-position: 4px 0, -4px 100%, 0 -4px, 100% 4px;
  }
`;

const StyledMarquee = styled.div`
  margin: 0 auto 0rem auto;
  max-width: ${(props) =>
    props.marqSize * 1.5 + "rem" ? props.marqSize * 1.5 + "rem" : "350px"};
  align-items: center;
  justify-content: center;
  animation: ${fadeInAnimation} ease-in-out 0.75s;
  animation-iteration-count: 1;
  z-index: 1;
  padding: 1rem;
  border-radius: 5px;

  // marquee select. With using the data prop, we cause a FULL rerendering if the marquee component
  &[data-active="true"] {
    background: linear-gradient(90deg, #333 50%, transparent 0) repeat-x,
      linear-gradient(90deg, #333 50%, transparent 0) repeat-x,
      linear-gradient(0deg, #333 50%, transparent 0) repeat-y,
      linear-gradient(0deg, #333 50%, transparent 0) repeat-y;
    background-size: 4px 1px, 4px 1px, 1px 4px, 1px 4px;
    background-position: 0 0, 0 100%, 0 0, 100% 0;
    animation: ${linearGradientMove} 0.3s infinite linear;
  }
`;

const StyledMarqueeRow = styled.div`
  display: flex;
  width: ${(props) => (props.marqWidth ? props.marqWidth : "350px")};
  flex-direction: row;
  justify-content: center;
  background-color: rgb(253, 243, 229);
  height: 5rem;
  margin: 0 auto;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.08), 0 2px 2px rgba(0, 0, 0, 0.12),
    0 4px 4px rgba(0, 0, 0, 0.16), 0 8px 8px rgba(0, 0, 0, 0.2);

  border: 0.25rem grey solid;
  border-top: none; // prevents border stacking
  /* 0th child is the DisplayBtn component */
  &:nth-child(2) {
    border-top: 0.25rem grey solid;
  }
`;
