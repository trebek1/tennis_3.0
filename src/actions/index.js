import axios from 'axios';

export const REQ_DATA = "REQ_DATA";
export const RES_DATA = "RES_DATA";
export const LOGIN = "LOGIN"; 
export const LOGOUT = "LOGOUT"; 


export function reqData() {
  return {
    type: REQ_DATA
  }
}

export function resData(products) {
  return {
    type: RES_DATA,
    products
  }
}