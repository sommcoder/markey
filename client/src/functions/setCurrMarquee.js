export default function setCurrMarquee(keysArr, formEl, data, appState) {
  // THIS IS HOW WE SET A SINGLE MARQUEE SUBMISSION

  const newInputObj = appState;
  console.log("newInputObj:", newInputObj);

  // TODO: how are we going to handle the "{special keys}"???
  // ROW Loop:
  for (let row = 0; row < keysArr.length; row++) {
    // no value clause:
    if (!formEl[row].value) continue;
    // we don't want empty row input

    // the pipe operator
    let inputStr = formEl[row].value.trim();
    let rowName = formEl[row].dataset.rowid;
    let rowArr = []; // sequence of characters

    console.log("inputStr:", inputStr);
    console.log("rowName:", rowName);

    let inputTile; // gets assigned in the loop below
    let inputTileObj;
    let multiCharStr; // gets assigned in the loop below
    // INPUT Loop:
    for (let ltr = 0; ltr < inputStr.length; ltr++) {
      console.log("inputStr[ltr]:", inputStr[ltr]);

      // special char?
      if (inputStr[ltr] === "{") {
        console.log("special! we found a: { ");
        let start = inputStr.indexOf("{") + 1;
        let end = inputStr.indexOf("}");

        multiCharStr = inputStr.slice(start, end); // gets up UNTIL
        // TODO: maybe we should look into splice as well since we need to modify the inputStr? The problem is when we HAVE multiple special characters on a single line
        console.log("multiCharStr:", multiCharStr);
        console.log("inputStr POST SLICE:", inputStr);
        if (!data.special[`{${multiCharStr}}`]) return; // this is a double check.
        inputTileObj = data.special[`{${multiCharStr}}`]; // needed for lookup
        console.log("inputTileObj:", inputTileObj);
        // push the whole string between { and } to the rowArr/
        console.log("rowArr:", rowArr);
        console.log("start:", start);
        console.log("end:", end);
        ltr += end - (start - 1); // iterate by the difference so we don't go each letter again and process the letter in the else block below.
        // need to increment end since we don't want to iterate over the }
        console.log("ltr:", ltr);

        if (!newInputObj.output[multiCharStr]) {
          newInputObj.output[multiCharStr] = 1; // assign to one
        } else {
          newInputObj.output[multiCharStr]++; // increment by one
        }

        // push to arr in this format: [[ltr, size], [ltr, size] ...]
        rowArr.push([inputTileObj.marqBlock, inputTileObj.size]);
      } else {
        console.log("ELSE BLOCK: ltr:", inputStr[ltr]);
        // handle individual chars:
        if (!data.regular[inputStr[ltr]]) return; // this is a double check.

        if (!newInputObj.output[inputStr[ltr]]) {
          newInputObj.output[inputStr[ltr]] = 1; // assign to one
        } else {
          newInputObj.output[inputStr[ltr]]++; // increment by one
        }
        // push to arr in this format: [[ltr, size], [ltr, size] ...]
        inputTile = data.regular[inputStr[ltr]];
        console.log("inputTile:", inputTile);
        rowArr.push([inputTile.marqBlock, inputTile.size]);
      }
    }

    formEl[row].value = ""; // reset row El's input value
    newInputObj.rows[rowName] = rowArr;
  }
  console.log("END Input newInputObj.output:", newInputObj.output);
  console.log("END Input newInputObj.rows:", newInputObj.rows);

  return newInputObj;
}
