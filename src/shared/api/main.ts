import { numDocuments } from "../constants/const"

export const getMessages = () => {
  //console.log(' get ')
  return fetch(`https://jservice.io/api/random?count=${numDocuments}`, {
    method: 'GET',
  })
  .then(res => {
    return res.json()
  })
}