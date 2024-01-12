export default function setCurrMarquee(
  keysArr,
  formEl,
  appState,
  data,
  selectedMarq
) {
  console.log("appState:", appState);
  console.log("formEl:", formEl);
  console.log("selectedMarq:", selectedMarq);
  const newRowObj = appState[selectedMarq]; // create a copy of the current state object
  console.log("SET CURR BTN, newRowObj:", newRowObj);

  // ROW Loop:
  for (let row = 0; row < keysArr.length; row++) {
    // no value clause
    if (!formEl[row].value) {
      continue;
    }
    let inputStr = formEl[row].value.trim();
    let rowName = formEl[row].dataset.rowid;
    let rowArr = []; // sequence of characters

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
    formEl[row].value = ""; // reset row El's value
    newRowObj.rows[rowName] = rowArr;
  }
  console.log("END Set CurrBTN, newRowObj:", newRowObj);
  return {
    [selectedMarq]: newRowObj,
  };
}
