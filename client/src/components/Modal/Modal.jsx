import styled, { keyframes } from "styled-components";
import ModalTable from "../ModalTable/ModalTable";
import ModalHeader from "../ModalHeader/ModalHeader";

export default function ModalWindow({
  modalState,
  appState,
  toggleModal,
  data,
  stateOutputObj,
  outputProcess,
  dispAppState,
  setOutputProcess,
  setStateOutputObj,
}) {
  console.log("modalWindow Component modalState:", modalState);
  console.log("stateOutputObj:", stateOutputObj);
  // will need a way to swap these.
  // If currOutput and newOutput have keys, then currOutput gets deleted, newOutput becomes currOutput and then we will have to calculate
  /*

We need to manage the FULL tally of ALL of the marquees in teh App component in State

user needs to see: 
1) what they need to ADD from inventory
2) what they can LEAVE on the current Marquee board
 
*/

  // TODO: we need to determine if this was a "set" or "compare" trigger. The Modal components will simply accept the data sent to them.

  // TODO: would be really nice to make the Modal draggable across the modal overlay

  // let outputObj;
  // useEffect(() => {
  //   if (stateOutputObj && outputProcess === "Set") {
  //     outputObj = stateOutputObj.currOutput;
  //   }
  //   if (stateOutputObj && outputProcess === "Compare") {
  //     outputObj = stateOutputObj.newOutput;
  //   }
  //   // else do nothing
  // }, [stateOutputObj, outputProcess]);

  function handleModalReset() {
    toggleModal(false);
    setStateOutputObj(() => {
      return {
        currOutput: {},
        newOutput: {},
      };
    });
    setOutputProcess(null);
    dispAppState({
      type: "RESET_APP",
    });
  }

  return (
    <StyledOverlay modalState={modalState}>
      {modalState ? (
        <StyledModalWindow>
          <ModalHeader />
          {outputProcess ? (
            <ModalTable
              appState={appState}
              data={data}
              stateOutputObj={stateOutputObj.currOutput}
              outputProcess={outputProcess}
            />
          ) : (
            <div>
              ERROR: No characters submitted to Marquees. <br /> Submit
              characters, then click: &apos;Set Current&apos;
            </div>
          )}
          <div>
            <StyledModalBtn onClick={() => toggleModal(false)}>
              Adjust
            </StyledModalBtn>

            <StyledModalBtn onClick={handleModalReset}>
              Reset App
            </StyledModalBtn>
          </div>
        </StyledModalWindow>
      ) : (
        ""
      )}
    </StyledOverlay>
  );
}

// TODO: Edit btn will allow user to add or change the current setup.

// TODO: Reset btn is a quick way to refresh the app and it's state

const slideDown = keyframes`
  0% {
  transform: translateY(-100%);
  }
  100% {
  transform: translateY(0%)
  }
`;

const StyledOverlay = styled.div`
  display: ${({ modalState }) => (modalState ? "block" : "none")};
  background-color: rgba(176, 224, 230, 0.4);
  position: fixed;
  height: 100%;
  width: 100%;
  z-index: 12;
  overflow-y: hidden;
  animation-name: ${slideDown}; // TODO: this isn't working as desired
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
  width: max-content; // wide enough to accommodate characters
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
  margin: 1.5rem;
`;
