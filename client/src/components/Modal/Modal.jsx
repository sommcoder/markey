import styled, { keyframes } from "styled-components";
import ModalTable from "../ModalTable/ModalTable";
import ModalHeader from "../ModalHeader/ModalHeader";
import { useEffect, useState } from "react";

import getTally from "../../functions/getTally";

export default function ModalWindow({
  modalState,
  toggleModal,
  appState,
  marKeysArr,
  data,
}) {
  console.log("modalWindow Component modalState:", modalState);
  const modalWindowWidth = 500;

  const [stateOutputObj, setStateOutputObj] = useState({
    currOutput: {},
    newOutput: {},
  });
  // will need a way to swap these.
  // If currOutput and newOutput have keys, then currOutput gets deleted, newOutput becomes currOutput and then we will have to calculate

  // useEffect(() => {
  //   //
  //   const tallyObj = getTally(appState, marKeysArr);

  //   if (
  //     Object.keys(stateOutputObj.currOutput.length) > 0 &&
  //     Object.keys(stateOutputObj.newOutput.length > 0)
  //   ) {
  //     // both stateOutputs have keys, create new object with the new key/values
  //     setStateOutputObj({
  //       currOutput: stateOutputObj.newOutput,
  //       newOutput: tallyObj,
  //     });
  //   }
  //   // determine if this is current or new
  //   setStateOutputObj();
  // }, [appState, marKeysArr]);
  /*
 
We need to manage the FULL tally of ALL of the marquees in teh App component in State


user needs to see: 

1) what they need to ADD from inventory
2) what they can LEAVE on the current Marquee board

 
*/

  //Object.keys(obj).length === 0 && obj.constructor === Object

  // TODO: we need to determine if this was a "set" or "compare" trigger. The Modal components will simply accept the data sent to them.

  const output = (stateOutputObj) => {
    if (
      Object.keys(stateOutputObj.currOutput).length === 0 &&
      Object.keys(stateOutputObj.newOutput).length === 0
    ) {
      // if both empty
      return {};
    }
  };

  // if no keys in output, table won't render
  const outputKeysArr = Object.keys(output);

  return (
    <StyledOverlay modalState={modalState}>
      {modalState ? (
        <StyledModalWindow modalWindowWidth={modalWindowWidth}>
          <ModalHeader />
          {outputKeysArr.length > 0 ? (
            <>
              <ModalTable
                data={data}
                output={output}
                outputKeysArr={outputKeysArr}
              />
              <StyledModalBtn onClick={() => toggleModal(false)}>
                Close
              </StyledModalBtn>
            </>
          ) : (
            ""
          )}
        </StyledModalWindow>
      ) : (
        ""
      )}
    </StyledOverlay>
  );
}

const slideDown = keyframes`
  0% {
  transform: translateY(-100%);
  }
  100% {
  transform: translateY(0%)
  }
`;

const StyledOverlay = styled.div`
  display: ${(props) => (props.modalState ? "block" : "none")};
  background-color: rgba(176, 224, 230, 0.4);
  position: fixed;
  height: 100%;
  width: 100%;
  z-index: 12;
  overflow-y: hidden;
  animation-name: ${slideDown};

  &:hover {
    cursor: pointer;
  }
`;

const StyledModalWindow = styled.div`
  display: grid;
  grid-template-rows: auto auto auto;
  text-align: center;
  justify-items: center;
  opacity: 5;
  position: fixed; // always viewable
  top: 50%;
  left: 50%;
  width: ${(props) => props.modalWindowWidth + "px"};
  min-height: 250px;
  background-color: rgba(255, 255, 255, 1);
  transform: translate(-50%, -50%);
  border-radius: 10px;
  z-index: 15;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.08), 0 2px 2px rgba(0, 0, 0, 0.12),
    0 4px 4px rgba(0, 0, 0, 0.16), 0 8px 8px rgba(0, 0, 0, 0.2);
`;

const StyledModalBtn = styled.button`
  align-self: center;
`;
