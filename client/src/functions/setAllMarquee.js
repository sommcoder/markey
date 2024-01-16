import setCurrMarquee from "./setCurrMarquee";

export default function setAllMarquee(keysArr, refStateObj, data) {
  let newAppState = {}; // blank object

  // TODO: Create a help modal: - select marquee - enter characters - submit current - choose "compare" or "close". if "close", "set Current" will be replaced by "View Tally".

  // if setCurrBtn is clicked we need to set ALL forms!

  // This is a less performant way of doing things, since the appState is already getting updated when user clicks enter but would rather focus on completing the project instead of prematurely optimizing!

  // FORM Loop:
  for (const formKey of Object.keys(refStateObj)) {
    // ROW Loop:
    newAppState[formKey] = setCurrMarquee(
      keysArr,
      refStateObj[formKey].current,
      data
    );
    // TODO: its reassigning after each iteration. We need a reference to the marqs to be able to dynamically assign the returning object to the CORRECT marq key
  }
  console.log("AFTER LOOP: newAppState:", newAppState);
  return newAppState;
}
