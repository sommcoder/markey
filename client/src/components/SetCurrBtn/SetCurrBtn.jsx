import styled from "styled-components";
import setCurrMarquee from "../../functions/setCurrMarquee";

export default function SetCurrBtn({
  data,
  rowState,
  dispRowState,
  keysArr,
  formName,
}) {
  console.log("formName:", formName);
  console.log("SET-BTN rowState:", rowState);
  console.log("SET-BTN keysArr:", keysArr);
  function submitMarquee(ev) {
    console.log("ev:", ev);
    console.log("ev.target.form:", ev.target.form);
    const updatedRowValuesObj = setCurrMarquee(ev, keysArr, rowState, data);
    console.log("updatedRowValuesObj:", updatedRowValuesObj);

    // dispatch reducer:
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
