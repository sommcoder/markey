export default function setCurrMarquee(keysArr, formEl, data) {
  // THIS IS HOW WE SET A SINGLE MARQUEE SUBMISSION
  const output = {};
  const rows = {
    0: [],
    1: [],
    2: [],
  };

  // ROW Loop:
  for (let row = 0; row < keysArr.length; row++) {
    // no value clause:
    if (!formEl[row].value) {
      continue;
    }
    let inputStr = formEl[row].value.trim();
    let rowName = formEl[row].dataset.rowid;
    let rowArr = []; // sequence of characters

    // INPUT Loop:
    for (let ltr = 0; ltr < inputStr.length; ltr++) {
      if (!data[inputStr[ltr]]) continue;

      // if we don't already have the ltr/key in our output object, add it
      !output[inputStr[ltr]]
        ? (output[inputStr[ltr]] = 1)
        : output[inputStr[ltr]]++;

      let inputData = data[inputStr[ltr]];
      rowArr.push([inputData.blockSymbol, inputData.size]);
    }
    formEl[row].value = ""; // reset row El's value
    rows[rowName] = rowArr;
  }
  console.log("END Input CurrBTN:", output);
  console.log("END Input CurrBTN:", rows);
  // returns an anonymous object to be assigned to a marqName outside this function. So whether this is a single marq "input" or a "set" function.
  return {
    rows: rows,
    output: output,
  };
}
