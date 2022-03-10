import { atom } from "recoil";

const productState = atom({
  key: "productState",
  default: [],
});

export default productState;
