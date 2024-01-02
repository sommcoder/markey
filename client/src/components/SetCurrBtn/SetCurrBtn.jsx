import styled from "styled-components";
import setCurrMarquee from "../../functions/setCurrMarquee";

export default function SetCurrBtn({ dispRowState, keysArr, formName }) {
  function submitMarquee(ev) {
    console.log("ev:", ev);

    const updatedRowValuesObj = setCurrMarquee(ev, keysArr);
    console.log("updatedRowValuesObj:", updatedRowValuesObj);

    // dispatch:
    dispRowState({
      type: "set",
      payload: updatedRowValuesObj,
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
