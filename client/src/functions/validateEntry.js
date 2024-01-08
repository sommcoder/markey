function validateEntry(
  ev,
  inputValidationObj,
  data,
  marqSize,
  keysArr,
  inputRefsArr
) {
  let key = ev.key;
  let row = ev.target.dataset.rowid;

  if (key === " ") ev.preventDefault();
  if (key === "Enter") {
    ev.preventDefault(); // don't submit
    return;
    // maybe a more elegent solution would be that enter will focus onto the next line and after the LAST input field, the focus will be on the SET button (or more accurately, whichever button is enabled)
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
  // 0.1 = block border size!
  let currBlockSize = +data[key].size + 0.1;

  // Max capacity check:
  if (inputValidationObj[row].sizes + currBlockSize > marqSize) {
    inputRefsArr.current[keysArr.indexOf(row)].animate(
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
  return;
}
