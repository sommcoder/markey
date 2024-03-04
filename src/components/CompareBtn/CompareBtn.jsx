import styled from "styled-components";
import setCurrMarquee from "../../functions/setCurrMarquee";

import getNextElNum from "../../functions/getNextElNum";

export default function CompareBtn({
  formName,
  dispAppState,
  keysArr,
  data,
  appState,
  selectedMarq,
  switchSelectedRow,
  selectedRow,
}) {
  function handleCompareMarquee(ev) {
    ev.preventDefault();
    console.log("ev:", ev);
    let rowStr; // <--- definitely not an ideal solution but will work
    // how do I get the row? Validation is now done on the client
    switchSelectedRow(getNextElNum(rowStr, selectedRow));

    // dispatch reducer:

    // setCurrMarquee(
    //     keysArr,
    //     ev.target.form,
    //     appState,
    //     data,
    //     selectedMarq
    //   )

    // just trigger the modal test:
    dispAppState({
      type: "compare",
      payload: {},
    });
  }

  /*
     
    BOTH set and compare have some common funcionality, but will update different properties on AppState

    This function should perhaps be performed INSIDE the button components and THEN passed to the Marquee component via the dispatch function where the rowReducer and update state and trigger an appState update as well 

    After the end of "set" & "compare" we need to update appState by MarqName and setInput/compareInput respectively!
   
     
    */

  return (
    <StyledCompareBtn
      form={formName}
      type="submit"
      onClick={(ev) => handleCompareMarquee(ev)}
      title="Compares to set marquee"
    >
      <div className="button-text">Compare</div>
    </StyledCompareBtn>
  );
}

const StyledCompareBtn = styled.button``;
