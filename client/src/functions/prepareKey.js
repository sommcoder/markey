const specialBtnsArr = ["Enter", "Backspace", "Delete", "CapsLock", "Tab"];

export default function prepareKey(ev) {
  let key = ev.type === "click" ? ev.target.value : ev.key;
  if (!key) return; // undefined input clause = no output
  if (specialBtnsArr.includes(key) || ev.target.dataset.special) return key;
  return key.toLowerCase();
}
