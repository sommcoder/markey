import setCurrMarquee from "./setCurrMarquee";

export default function setAllMarquee(keysArr, refStateObj, data, appState) {
  let newAppState = {}; // blank object

  // This is a less performant way of doing things, since the appState is already getting updated when user clicks enter but would rather focus on completing the project instead of prematurely optimizing!

  // FORM Loop:
  for (const formKey of Object.keys(refStateObj)) {
    // ROW Loop:
    newAppState[formKey] = setCurrMarquee(
      keysArr,
      refStateObj[formKey].current,
      data,
      appState[formKey]
    );
  }
  console.log("AFTER LOOP: newAppState:", newAppState);
  return newAppState;
}
