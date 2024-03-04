import styled from "styled-components";
import setAllMarquee from "../../functions/setAllMarquee";

export default function SetCurrBtn({
  data,
  refStateObj,
  keysArr,
  appState,
  dispAppState,
  setOutputProcess,
  setValidationObj,
}) {
  function handleSubmit(ev) {
    // this button now submits the entire Marquee range!
    ev.preventDefault();
    console.log("ev:", ev);

    // reset to initial state:
    // this is in case text forms will filled out but not submitted.
    // setting appState sets the text and therefore we need to clear the validation object too
    setValidationObj(() => {
      return {
        West: {
          0: { values: [], size: 0 },
          1: { values: [], size: 0 },
          2: { values: [], size: 0 },
        },
        East: {
          0: { values: [], size: 0 },
          1: { values: [], size: 0 },
          2: { values: [], size: 0 },
        },
        South: {
          0: { values: [], size: 0 },
          1: { values: [], size: 0 },
          2: { values: [], size: 0 },
        },
      };
    });

    // dispatch reducer:
    dispAppState({
      type: "SET_APP",
      updatedState: setAllMarquee(keysArr, refStateObj, data, appState),
    });
    setOutputProcess("set");
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
