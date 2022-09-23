import { numDocuments } from "../constants/const"
import { IDataFromApi, IImgApi } from "../types/main"

export const getMessages = (): Promise<IDataFromApi[]> => {
  return fetch(`https://jservice.io/api/random?count=${numDocuments}`, {
    method: 'GET',
  })
  .then(res => {
    return res.json()
  })
}

export const getImg = (): Promise<IImgApi> => {
  return fetch(`https://yesno.wtf/api`, {
    method: 'GET',
  })
  .then(res => {
    return res.json()
  })
}