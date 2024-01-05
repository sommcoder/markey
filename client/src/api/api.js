import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api/v1",
});

export default async function getCharacterStock() {
  const res = await api.get("/characters");
  console.log("res:", res);
  return res;
}
