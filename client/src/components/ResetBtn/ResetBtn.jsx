import styled from "styled-components";

import { FiRefreshCcw } from "react-icons/fi";
import { IconContext } from "react-icons/lib";

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
      <div className="button-text">
        <FiRefreshCcw />
      </div>
    </StyledResetBtn>
  );
}

const StyledResetBtn = styled.button`
  border-radius: 20px;
  margin-top: 0.75rem;
  margin-left: 1rem;
  width: 3rem;
  height: 3rem;
  position: absolute; //
`;
