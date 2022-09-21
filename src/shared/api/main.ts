import { numDocuments } from "../constants/const"
import { objectFromApi, imgApi } from "../types/main"

export const getMessages = (): Promise<objectFromApi[]> => {
  //console.log(' get ')
  return fetch(`https://jservice.io/api/random?count=${numDocuments}`, {
    method: 'GET',
  })
  .then(res => {
    return res.json()
  })
}

export const getImg = (): Promise<imgApi> => {
  //console.log(' get ')
  return fetch(`https://yesno.wtf/api`, {
    method: 'GET',
  })
  .then(res => {
    return res.json()
  })
}