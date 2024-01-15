export default function getNextElNum(rowStr, selectedRow) {
  if (selectedRow === 2) return 0; // if last el, back to 1st row
  else {
    let rowNum = rowStr ? +rowStr : +selectedRow; //convert to number
    return (rowNum += 1); // increment
  }
}
