import data from "../data/blockData.json";

export default function setCurrMarquee(ev, keysArr, rowState) {
  ev.preventDefault();
  console.log("rowState:", rowState);
  console.log("keysArr:", keysArr);
  const newRowObj = rowState; // create a copy of the current state object
  console.log("ev:", ev);
  let form = ev.target.form; // form Element

  console.log("form:", form);
  // ROW Loop:
  for (let row = 0; row < keysArr.length; row++) {
    console.log("form[row].value:", form[row].value);

    // no value clause
    if (!form[row].value) {
      console.log(`row: "${row}" had no value!`);
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
      if (!newRowObj.output[inputStr[ltr]]) newRowObj.output[inputStr[ltr]] = 1;
      else newRowObj.output[inputStr[ltr]]++;

      let inputData = data[inputStr[ltr]];
      rowArr.push([inputData.blockSymbol, inputData.size]);
    }
    form[row].value = ""; // reset row El's value
    newRowObj.view[rowName] = rowArr;
    console.log("newRowObj.output:", newRowObj.output);
  }
  return newRowObj;
}
