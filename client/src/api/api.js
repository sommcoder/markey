// import axios from "axios";
import firebase from "firebase";

const firestore = firebase.firestore();

// const api = axios.create({
//   baseURL: "http://localhost:5000/api/v1",
// });

// READ
export async function getCharacterStock() {
  // const res = await api.get("/characters");
  // console.log("AXIOS - res:", res);
  // direct firestore access using Firebase SDKs
  const blocks = await firestore.collection("blocks").get();
  console.log("blocks:", blocks);

  // return res.data;
  return blocks;
  // axios automatically throw errors for unsuccessful HTTP calls
}

// UPDATE
export async function updateCharacterStock() {
  const res = await api.patch("/characters");
  console.log("AXIOS - res:", res);
  return res.data;
  // axios automatically throw errors for unsuccessful HTTP calls
}
