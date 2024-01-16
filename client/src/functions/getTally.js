export default function getTally(appState) {
  const tallyObj = {};
  let marKeysArr = Object.keys(appState);
  // Double for loop, through marquees, then through their output chars
  for (let marq = 0; marq < marKeysArr.length; marq++) {
    for (let char of Object.keys(appState[marKeysArr[marq]].output)) {
      if (Object.hasOwn(tallyObj, char)) {
        // if tally object has key already, add!
        tallyObj[char] + appState[marKeysArr[marq]].output[char];
      } else {
        // if tally object doesn't have key already, assign!
        tallyObj[char] = appState[marKeysArr[marq]].output[char];
      }
    }
  }
  return tallyObj;
}
