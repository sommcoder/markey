export default function setCurrMarquee(ev, keysArr, appState, data, marqName) {
  ev.preventDefault();

  console.log("appState:", appState);
  const newRowObj = appState[marqName]; // create a copy of the current state object
  console.log("SET CURR BTN, newRowObj:", newRowObj);
  let form = ev.target.form; // form Element

  // ROW Loop:
  for (let row = 0; row < keysArr.length; row++) {
    // no value clause
    if (!form[row].value) {
      continue;
    }
    let inputStr = form[row].value.trim();
    let rowName = form[row].dataset.rowid;
    let rowArr = [];

    // INPUT Loop:
    for (let ltr = 0; ltr < inputStr.length; ltr++) {
      if (!data[inputStr[ltr]]) {
        console.log("error: cannot find character in database");
        continue;
      }
      // if we don't already have the ltr/key in our output object, add it
      if (!newRowObj.output[inputStr[ltr]]) {
        newRowObj.output[inputStr[ltr]] = 1;
      } else {
        newRowObj.output[inputStr[ltr]]++;
      }
      let inputData = data[inputStr[ltr]];
      rowArr.push([inputData.blockSymbol, inputData.size]);
    }
    form[row].value = ""; // reset row El's value
    newRowObj.rows[rowName] = rowArr;
  }
  console.log("END Set CurrBTN, newRowObj:", newRowObj);
  return {
    [marqName]: newRowObj,
  };
}
