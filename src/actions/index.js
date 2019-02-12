import axios from "axios";

export const REQ_DATA = "REQ_DATA";
export const RES_DATA = "RES_DATA";
export const LOGIN = "LOGIN";
export const LOGOUT = "LOGOUT";

export const reqData = () => ({
  type: REQ_DATA
});

export const resData = products => ({
  type: RES_DATA,
  products
});
