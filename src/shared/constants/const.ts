import { 
  IImgMemory,
  IDocumentID,
} from "../types/main"

/**
 * Максимальное количество кнопок переключения страниц
 */
export const maxAmountButtonsOnPage = 5

/**
 * Количество файлов, которое загружается по API
 */
export const numDocuments = 100

/**
 * Высота свернутого документа. 50 высота и 5 margin сверху и снизу
 */
export const heightDoc = 60

export const emptyImgMemory: IImgMemory[] = [
  {
    title: '',
    image: '',
  }
]

export const emptyObject: IDocumentID[] = [
  {
    id: 0,
    title: '',
    text: '',
    dateOfCreate: new Date('2005-11-25T12:00:00.000Z'),
  }
]