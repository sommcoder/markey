export default function getTally(appState, marKeysArr) {
  const sortedTallyObj = {};

  // triggered on appState change
  // double for loop, through marquees, then through their output chars
  for (let marq = 0; marq < marKeysArr.length; marq++) {
    for (let char of Object.keys(appState[marKeysArr[marq]].output)) {
      // if tally object has key already, add
      if (Object.hasOwn(sortedTallyObj, char)) {
        sortedTallyObj[char] + appState[marKeysArr[marq]].output[char];
      }
      // if tally object doesn't have key already, assign
      sortedTallyObj[char] = appState[marKeysArr[marq]].output[char];
    }
  }

  return sortedTallyObj;
}
