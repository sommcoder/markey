import setCurrMarquee from "./setCurrMarquee";

export default function setAllMarquee(keysArr, refStateObj, appState, data) {
  console.log("appState:", appState);
  console.log("refStateObj:", refStateObj);
  let newAppState = {}; // blank object

  // TODO: Create a help modal: - select marquee - enter characters - submit current - choose "compare" or "close". if "close", "set Current" will be replaced by "View Tally".
  // if setCurrBtn is clicked we need to set ALL forms!

  // This is a less performant way of doing things, since the appState is already getting updated when user clicks enter but would rather focus on completing the project instead of prematurely optimizing!

  // FORM Loop:
  for (const formKey of Object.keys(refStateObj)) {
    // ROW Loop:
    newAppState = setCurrMarquee(
      keysArr,
      refStateObj[formKey].current,
      appState,
      data,
      formKey // is the "marq" parameter in this function
    );
  }
  console.log("newAppState:", newAppState);
  return newAppState;
}
