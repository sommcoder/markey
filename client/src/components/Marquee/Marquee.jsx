import TextRowForm from "../TextRowForm/TextRowForm.jsx";
import Block from "../Block/Block.jsx";
import styled, { keyframes } from "styled-components";
import SelectBtn from "../SelectBtn/SelectBtn.jsx";
import { forwardRef } from "react";

export default forwardRef(function Marquee(
  {
    data,
    appState,
    keysArr,
    dispAppState,
    marqName,
    marqSize,
    selectedMarq,
    switchSelectedMarq,
    selectedRow,
    switchSelectedRow,
  },
  ref
) {
  const marqWidth = marqSize + "rem";

  return (
    <StyledMarquee
      marqName={marqName}
      data-active={selectedMarq === marqName ? "true" : "false"}
    >
      <SelectBtn
        keysArr={keysArr}
        marqName={marqName}
        selectedMarq={selectedMarq}
        switchSelectedMarq={switchSelectedMarq}
        onBlur={(ev) => ev.preventDefault()}
      />
      {keysArr.map((row) => (
        <StyledMarqueeRow marqWidth={marqWidth} key={`${marqName}-${row}`}>
          {appState[marqName].rows[row].length > 0
            ? appState[marqName].rows[row].map((blockKey, i) => (
                <Block
                  appState={appState}
                  key={`${marqName}-${row}-${i}`}
                  block={blockKey[0]}
                  style={blockKey[1]}
                  delay={i + 1}
                />
              ))
            : ""}
        </StyledMarqueeRow>
      ))}
      <TextRowForm
        ref={ref}
        data={data}
        formName={`${marqName}-Form`}
        appState={appState}
        dispAppState={dispAppState}
        marqName={marqName}
        keysArr={keysArr}
        marqSize={marqSize}
        selectedMarq={selectedMarq}
        switchSelectedMarq={switchSelectedMarq}
        selectedRow={selectedRow}
        switchSelectedRow={switchSelectedRow}
      />
    </StyledMarquee>
  );
});

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
  z-index: 1;
  padding: 2rem;

  // marquee select. With using the data prop, we cause a FULL rerendering if the marquee component
  &[data-active="true"] {
    background: linear-gradient(90deg, #333 50%, transparent 0) repeat-x,
      linear-gradient(90deg, #333 50%, transparent 0) repeat-x,
      linear-gradient(0deg, #333 50%, transparent 0) repeat-y,
      linear-gradient(0deg, #333 50%, transparent 0) repeat-y;
    background-size: 4px 1px, 4px 1px, 1px 4px, 1px 4px;
    background-position: 0 0, 0 100%, 0 0, 100% 0;
    animation: ${linearGradientMove} 0.3s infinite linear;
    box-shadow: 0 1px 2px rgba(176, 224, 230, 0.25),
      0 2px 4px rgba(176, 224, 230, 0.25), 0 4px 8px rgba(176, 224, 230, 0.25),
      0 8px 16px rgba(176, 224, 230, 0.25),
      0 16px 32px rgba(176, 224, 230, 0.25),
      0 32px 64px rgba(176, 224, 230, 0.25);
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
