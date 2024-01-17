import styled from "styled-components";
import setAllMarquee from "../../functions/setAllMarquee";

export default function SetCurrBtn({
  data,
  refStateObj,
  keysArr,
  appState,
  dispAppState,
}) {
  function handleSubmit(ev) {
    // this button now submits the entire Marquee range!
    ev.preventDefault();
    console.log("ev:", ev);

    // dispatch reducer:
    dispAppState({
      type: "set",
      payload: setAllMarquee(keysArr, refStateObj, data, appState),
    });
  }

  return (
    <StyledSetCurrBtn
      onClick={(ev) => handleSubmit(ev)}
      name="Set"
      type="submit"
      title="Sets the selected marquee"
    >
      <div className="button-text">Set Marquee</div>
    </StyledSetCurrBtn>
  );
}

const StyledSetCurrBtn = styled.button`
  border-radius: 30px;
  width: 15rem;
`;
