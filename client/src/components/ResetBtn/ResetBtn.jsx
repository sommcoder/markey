import styled from "styled-components";

import { FiRefreshCcw } from "react-icons/fi";

export default function ResetBtn({
  initMarqRowState,
  dispRowState,
  formName,
  keysArr,
}) {
  //////////////////////////////////////////////
  // RESET FORM FUNCTION
  function resetRows(ev) {
    ev.preventDefault();

    console.log("reset - ev:", ev);

    const updatedRowValuesObj = initMarqRowState;

    for (let i = 0; i < keysArr.length; i++) ev.target.form[i].value = "";

    dispRowState({
      type: "reset",
      payload: updatedRowValuesObj,
    });
  }
  return (
    <StyledResetBtn onClick={(ev) => resetRows(ev)}>
      <FiRefreshCcw />
    </StyledResetBtn>
  );
}

const StyledResetBtn = styled.button``;
