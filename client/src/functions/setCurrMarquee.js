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

    let inputTile;
    let multiCharStr;
    // INPUT Loop:
    for (let ltr = 0; ltr < inputStr.length; ltr++) {
      console.log("inputStr[ltr]:", inputStr[ltr]);
      if (inputStr[ltr] === "{") {
        console.log("special!");
        let start = inputStr.indexOf("{") + 1;
        let end = inputStr.indexOf("}"); // UNTIL
        multiCharStr = inputStr.slice(start, end);
        console.log("multiCharStr:", multiCharStr);
        inputTile = data[inputStr[multiCharStr]];
        rowArr.push([inputTile.blockSymbol, inputTile.size]);
        // Can we force an iteration of the loop until AFTER "}" ???
        // Would prevent excess loops, not that it would take much longer though
        // TODO: truthfully, the best lookup would be to give each "tile" an id, this would be we wouldn't be tripped up by all of this string bs
        /*
  "01234": { <--- there would need to be a key = id lookup for onKeyDown()
    "marqueeTile": "paradiseonbloor.com",   // <--- how each block renders
    "textRow": "{paradiseonbloor.com}"  // <--- how input renders 
    "stock": 3,
    "size": "5.5"
  },
*/
      } else {
        if (!data[inputStr[ltr]]) return; // this is a double check.

        if (!newInputObj.output[inputStr[ltr]]) {
          newInputObj.output[inputStr[ltr]] = 1; // assign to one
        } else {
          newInputObj.output[inputStr[ltr]]++; // increment by one
        }
        // push to arr in this format: [[ltr, size], [ltr, size] ...]
        inputTile = data[inputStr[ltr]];
        rowArr.push([inputTile.blockSymbol, inputTile.size]);
      }
    }

    formEl[row].value = ""; // reset row El's input value
    newInputObj.rows[rowName] = rowArr;
  }
  console.log("END Input newInputObj.output:", newInputObj.output);
  console.log("END Input newInputObj.rows:", newInputObj.rows);

  return newInputObj;
}

function handleMultiCharKeys() {
  //
}
