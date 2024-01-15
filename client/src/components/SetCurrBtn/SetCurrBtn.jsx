import styled from "styled-components";

import setAllMarquee from "../../functions/setAllMarquee";
import getNextElNum from "../../functions/getNextElNum";

export default function SetCurrBtn({
  data,
  refStateObj,
  keysArr,
  appState,
  dispAppState,
  switchSelectedMarq,
  switchSelectedRow,
}) {
  function handleSubmit(ev) {
    // this button now submits the entire Marquee range!
    ev.preventDefault();
    console.log("ev:", ev);

    // reset to null
    switchSelectedMarq(null);
    switchSelectedRow(null);

    // dispatch reducer:
    dispAppState({
      type: "set-all",
      payload: setAllMarquee(keysArr, refStateObj, appState, data),
    });
  }

  return (
    <StyledSetCurrBtn
      onClick={(ev) => handleSubmit(ev)}
      name="Set"
      type="submit"
      title="Sets the selected marquee"
    >
      <div className="button-text">Set Current</div>
    </StyledSetCurrBtn>
  );
}

const StyledSetCurrBtn = styled.button``;
