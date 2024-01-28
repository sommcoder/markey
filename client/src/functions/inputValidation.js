import getNextElNum from "./getNextElNum";

// Trying to figure out if this function can be isolated into it's own module/script...so far looks like it's not worth it

//////////////////////////////////
//////////////////////////////////
// THIS WOULD BE KEPT GLOBAL:
const inputValidationObj = {
  row0: { values: [], sizes: 0 },
  row1: { values: [], sizes: 0 },
  row2: { values: [], sizes: 0 },
};
// tracks the sequence of characters entered through onKeyDown() in TextRowForm component or onClick() in Key component
const inputRefsArr = [];

function getNextEl(row) {
  let currEl = inputRefsArr.current.findIndex((el) => el.dataset.rowid === row);
  // if last el, start from the beginning
  return currEl === inputRefsArr.current.length - 1 ? 0 : currEl + 1;
}
//////////////////////////////////
//////////////////////////////////
//////////////////////////////////
//////////////////////////////////
export function validateInput(row, key, data, ev, marqSize) {
  if (key === "Enter") {
    console.log("row:", row);

    let nextEl = getNextEl(row);
    inputRefsArr.current[nextEl].focus();
    // dispatch reducer:
    // dispAppState({
    //   type: "set",
    //   payload: setCurrMarquee(ev, keysArr, appState, data, currMarq),
    // });
    return;
  }
  if (key === "Backspace" || key === "Delete") {
    if (inputValidationObj[row].sizes === 0) {
      return;
    }
    // update validation Object:
    inputValidationObj[row].sizes -=
      +data[inputValidationObj[row].values.at(-1)].size;
    inputValidationObj[row].values.pop();
    ev.target.value = inputValidationObj[row].values.join("");
    return;
  }
  if (!data[key]) return;
  // key doesn't exist in data
  // 0.1 = accounts for block border size
  let currBlockSize = +data[key].size + 0.1;
  // Max capacity check:
  // existing width + current block size would be greater than the marqSize
  if (inputValidationObj[row].sizes + currBlockSize > marqSize) {
    ev.target.form[row].animate(
      [
        {
          transform: "translateX(-0.33%)",
          borderColor: "rgb(255, 0, 0)",
        },
        {
          transform: "translateX(0.33%)",
          borderColor: "rgb(255, 0, 0)",
        },
      ],
      { duration: 150, iterations: 3 }
    );
    return;
  }
  // append validation Object:
  inputValidationObj[row].sizes += currBlockSize;
  inputValidationObj[row].values.push(key);
  ev.target.value = inputValidationObj[row].values.join("");
}
