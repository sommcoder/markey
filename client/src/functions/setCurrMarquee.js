export default function setCurrMarquee(keysArr, formEl, data, appState) {
  // THIS IS HOW WE SET A SINGLE MARQUEE SUBMISSION

  const newInputObj = appState;
  console.log("newInputObj:", newInputObj);
  // TODO: WE NEED TO ONLY ACCEPT ROWS THAT HAVE INPUT

  // ROW Loop:
  for (let row = 0; row < keysArr.length; row++) {
    // no value clause:
    if (!formEl[row].value) continue;
    // we don't want empty row input

    let inputStr = formEl[row].value.trim();
    let rowName = formEl[row].dataset.rowid;
    let rowArr = []; // sequence of characters

    console.log("inputStr:", inputStr);
    console.log("rowName:", rowName);
    // INPUT Loop:

    for (const ltr in inputStr) {
      if (!data[inputStr[ltr]]) return; // this is a double check.

      if (!newInputObj.output[inputStr[ltr]]) {
        newInputObj.output[inputStr[ltr]] = 1; // assign to one
      } else {
        newInputObj.output[inputStr[ltr]]++; // increment by one
      }
      // push to arr in this format: [[ltr, size], [ltr, size] ...]
      let inputData = data[inputStr[ltr]];
      rowArr.push([inputData.blockSymbol, inputData.size]);
    }

    formEl[row].value = ""; // reset row El's input value
    newInputObj.rows[rowName] = rowArr;
  }
  console.log("END Input newInputObj.output:", newInputObj.output);
  console.log("END Input newInputObj.rows:", newInputObj.rows);

  return newInputObj;
}
