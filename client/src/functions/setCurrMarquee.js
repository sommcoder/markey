export default function setCurrMarquee(keysArr, formEl, data, appState) {
  // THIS IS HOW WE SET A SINGLE MARQUEE SUBMISSION

  const newInputObj = appState;
  console.log("newInputObj:", newInputObj);

  // TODO: maybe we lookup based on

  // ! ROW Loop:
  for (let row = 0; row < keysArr.length; row++) {
    // no value clause:
    if (!formEl[row].value) continue;
    // we don't want empty row input

    // the pipe operator
    let inputStrArr = formEl[row].value.trim().split("");
    let rowName = formEl[row].dataset.rowid;
    let rowArr = []; // sequence of characters

    console.log("inputStrArr:", inputStrArr);
    console.log("rowName:", rowName);

    let inputTile; // gets assigned in the loop below
    let inputBlockObj;
    let multiCharArr; // gets assigned in the loop below

    // ! INPUT Loop:
    for (let ltr = 0; ltr < inputStrArr.length; ltr++) {
      // filler skip:
      if (inputStrArr[ltr] === "_") continue;

      if (inputStrArr[ltr] === "{") {
        console.log("special! we found a: { ");
        // we want to splice out the { } as well
        // new references created each time this is executed:
        let start = inputStrArr.indexOf("{");
        let end = inputStrArr.indexOf("}");
        let diff = end - start + 1;

        multiCharArr = inputStrArr.splice(start, diff);
        console.log("multiCharArr:", multiCharArr);

        multiCharArr.shift();
        multiCharArr.pop();

        console.log("inputStrArr:", inputStrArr);
        let multiCharStr = multiCharArr.join("");

        // get block's Key Values:
        inputBlockObj = data[multiCharStr];

        console.log("inputBlockObj:", inputBlockObj);
        // output tracking:
        if (!newInputObj.output[multiCharStr]) {
          newInputObj.output[multiCharStr] = 1; // assign to one
        } else {
          newInputObj.output[multiCharStr]++; // increment by one
        }
        rowArr.push([inputBlockObj.marqBlock, inputBlockObj.size]);

        // cleanup:
        multiCharArr = []; // reset the specialCharArr
        inputStrArr.unshift("_"); // just a blank so that the next iteration of input won't be skipped now that we've mutated the input array.
      } else {
        console.log("ELSE BLOCK: ltr:", inputStrArr[ltr]);
        // handle individual chars:
        if (!data[inputStrArr[ltr]]) return; // this is a double check.

        if (!newInputObj.output[inputStrArr[ltr]]) {
          newInputObj.output[inputStrArr[ltr]] = 1; // assign to one
        } else {
          newInputObj.output[inputStrArr[ltr]]++; // increment by one
        }
        // push to arr in this format: [[ltr, size], [ltr, size] ...]
        inputTile = data[inputStrArr[ltr]];
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
