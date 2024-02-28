export default function getTally(appState, data) {
  const tallyObj = {};
  let marKeysArr = Object.keys(appState);
  // Double for loop, through marquees, then through their output chars
  for (let marq = 0; marq < marKeysArr.length; marq++) {
    for (let char of Object.keys(appState[marKeysArr[marq]].output)) {
      if (char === " ") continue; // <-- ignore spaces
      if (Object.hasOwn(tallyObj, char)) {
        // if tally object has key already, add!
        tallyObj[char] += appState[marKeysArr[marq]].output[char];
      } else {
        // if tally object doesn't have key already, assign!
        tallyObj[char] = appState[marKeysArr[marq]].output[char];
      }
    }
  }

  console.log("tallyObj:", tallyObj);

  Object.keys(tallyObj).forEach((char) => {
    if (tallyObj[char] > data[char]) {
      // Throw error: not enough ${char} blocks! Reconfigure your
    }
  });
  /*
   
  should compare the output tally to data
   
  */

  return tallyObj;
}
