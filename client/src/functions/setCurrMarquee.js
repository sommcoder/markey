export default function setCurrMarquee(keysArr, formEl, data, ...appState) {
  // THIS IS HOW WE SET A SINGLE MARQUEE SUBMISSION
  const output = {};
  const rows = {
    0: [],
    1: [],
    2: [],
  };

  let currAppState = appState[0];

  // ROW Loop:
  for (let row = 0; row < keysArr.length; row++) {
    // no value clause:
    if (!formEl[row].value) {
      console.log("currAppState:", currAppState);
      if (currAppState) continue;
    }
    let inputStr = formEl[row].value.trim();
    let rowName = formEl[row].dataset.rowid;
    let rowArr = []; // sequence of characters

    // INPUT Loop:
    for (let ltr = 0; ltr < inputStr.length; ltr++) {
      if (!data[inputStr[ltr]]) {
        // the letter does not exist in the data
        continue;
      }

      // if we don't already have the ltr/key in our output object, add it with a 1, else increment it
      if (!output[inputStr[ltr]]) {
        output[inputStr[ltr]] = 1;
      } else {
        output[inputStr[ltr]]++;
      }
      // push to the sequence array in this format: [[ltr, size], [ltr, size] ...]
      let inputData = data[inputStr[ltr]];
      rowArr.push([inputData.blockSymbol, inputData.size]);
    }
    formEl[row].value = ""; // reset row El's input value
    rows[rowName] = rowArr;
  }
  console.log("END Input output:", output);
  console.log("END Input rows:", rows);
  // returns an anonymous object to be assigned to a marqName outside this function. So whether this is a single marq "input" or a "set" function.
  return {
    rows: rows,
    output: output,
  };
}
