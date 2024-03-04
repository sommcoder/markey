export default function setCurrMarquee(keysArr, formEl, data, appState) {
  // THIS IS HOW WE SET A SINGLE MARQUEE SUBMISSION

  const newInputObj = appState;
  // ! ROW Loop:
  for (let row = 0; row < keysArr.length; row++) {
    // no value clause:
    if (!formEl[row].value) continue;
    let inputStrArr = formEl[row].value.trim().split(""); // each char as arr
    let rowName = formEl[row].dataset.rowid; // name of row
    let rowArr = []; // sequence of characters
    let inputTile; // gets assigned in the loop below
    let multiCharArr; // gets assigned in the loop below
    // ! INPUT Loop:
    for (let ltr = 0; ltr < inputStrArr.length; ltr++) {
      // filler skip:
      if (inputStrArr[ltr] === "_") continue;
      // special char handling:
      if (inputStrArr[ltr] === "{") {
        let start = inputStrArr.indexOf("{");
        let end = inputStrArr.indexOf("}");
        let diff = end - start + 1;
        multiCharArr = inputStrArr.splice(start, diff);
        multiCharArr.shift();
        multiCharArr.pop();

        let multiCharStr = multiCharArr.join("");

        // get block's Key Values:
        let blockObj = data[multiCharStr]; // what we get from data.json

        // output tracking:
        if (!newInputObj.output[multiCharStr]) {
          newInputObj.output[multiCharStr] = 1; // assign to one
        } else {
          newInputObj.output[multiCharStr]++; // increment by one
        }
        rowArr.push([blockObj.marqBlock, blockObj.size]);

        // just a filler element to continue our current iteration
        inputStrArr.unshift("_");
      } else {
        // regular char handling:
        if (!data[inputStrArr[ltr]]) return; // this is a double check.

        if (!newInputObj.output[inputStrArr[ltr]]) {
          newInputObj.output[inputStrArr[ltr]] = 1; // assign to one
        } else {
          newInputObj.output[inputStrArr[ltr]]++; // increment by one
        }
        // push to arr in this format: [[ltr, size], [ltr, size] ...]
        inputTile = data[inputStrArr[ltr]];
        rowArr.push([inputTile.marqBlock, inputTile.size]);
      }
    }
    formEl[row].value = ""; // reset row El's input value
    newInputObj.rows[rowName] = rowArr;
  }
  return newInputObj;
}
