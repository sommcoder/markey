import styled from "styled-components";
import setCurrMarquee from "../../functions/setCurrMarquee";

export default function SetCurrBtn({
  data,
  marqName,
  formName,
  keysArr,
  appState,
  dispAppState,
}) {
  function submitMarquee(ev) {
    // dispatch reducer:
    dispAppState({
      type: "set",
      payload: setCurrMarquee(ev, keysArr, appState, data, marqName),
    });
  }
  return (
    <StyledSetCurrBtn
      form={formName}
      type="submit"
      onClick={submitMarquee}
      title="Sets the current marquee"
    >
      <div className="button-text">Set</div>
    </StyledSetCurrBtn>
  );
}

const StyledSetCurrBtn = styled.button``;
