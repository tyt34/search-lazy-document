import { IDocumentID } from "../types/main"

/**
 * Функция для удаления из текста <i> <i/>
 * @param text 
 * @returns 
 */
export function delSymI(text: string) {
  if (text.split('<i>').length !== 1) {
    return text.split('<i>')[1].split('</i>')[0]
  } else if (text.split('<I>').length !== 1) {
    return text.split('<I>')[1].split('</i>')[0]
  } else {
    return text
  }
}

/**
 * Формирования массива с номерами страниц для отображения, где 
 * номер текущей странице должен быть в середине массива, если это возможно.
 * Например: пользователь находится на странице 1, всего может быть 5, на экране должно быть не больше 5.
 * Результат будет: 1, 2, 3, 4, 5.
 * Другой пример: пользователь находится на странице 5, всего может быть 10, на экране должно быть не больше 5.
 * Результат будет: 3, 4, 5, 6, 7
 * @param nowNumber текущий номер страницы
 * @param maxPages максимальное номер страницы
 * @param maxAmountButtonsOnPage количество кнопок, которые будут отображаться в приложение
 * @returns 
 */
export function getButtonsForPagi(
  nowNumber: number, 
  maxPages: number, 
  maxAmountButtonsOnPage: number
) {
  const a = nowNumber
  const b = maxPages
  const c = maxAmountButtonsOnPage
  const cFloor = Math.floor(c/2)
  const arrButtons = []
  if (b > c) {
    if (a < c) {
      if (a <= Math.ceil(c/2)) {
        for (let i=1; i <= c; i++) {
          arrButtons.push(i)
        }
      } else {
        for (let i=(a-cFloor); i < (a-cFloor+c); i++) {
          arrButtons.push(i)
        }
      }
    } else {
      if (a <= (b-cFloor)) {
        for (let i=(a-cFloor); i<(a-cFloor+c); i++) {
          arrButtons.push(i)
        }
      } else {
        for (let i=(b-c+1); i<b+1; i++) {
          arrButtons.push(i)
        }
      }
    }
  } else {
    for (let i=1; i<b+1; i++) {
      arrButtons.push(i)
    }
  }
  return arrButtons
}

/**
 * Получить псевдо рандомное число от 0 до max.
 * max в результат не входит
 * @param max 
 * @returns 
 */
export function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

/**
 * Сортировка по имени и возрастанию
 * @param a 
 * @param b 
 * @returns 
 */
export function sortNameUp(a: IDocumentID, b: IDocumentID): number {
  if (a.title.toLocaleLowerCase() < b.title.toLocaleLowerCase()) {
    return -1
  }
  if (a.title.toLocaleLowerCase() > b.title.toLocaleLowerCase()) {
    return 1
  }
  return 0
}

/**
 * Сортировка по имени и убыванию
 * @param a 
 * @param b 
 * @returns 
 */
export function sortNameDown(a: IDocumentID, b: IDocumentID): number {
  if (a.title.toLocaleLowerCase() > b.title.toLocaleLowerCase()) {
    return -1
  }
  if (a.title.toLocaleLowerCase() < b.title.toLocaleLowerCase()) {
    return 1
  }
  return 0
}

/**
 * Сортировка по дате и возрастанию
 * @param a 
 * @param b 
 * @returns 
 */
export function sortDateUp(a: IDocumentID, b: IDocumentID): number {
  if (a.dateOfCreate < b.dateOfCreate) {
    return -1
  }
  if (a.dateOfCreate > b.dateOfCreate) {
    return 1
  }
  return 0
}

/**
 * Сортировка по дате и убыванию
 * @param a 
 * @param b 
 * @returns 
 */
export function sortDateDown(a: IDocumentID, b: IDocumentID): number {
  if (a.dateOfCreate > b.dateOfCreate) {
    return -1
  }
  if (a.dateOfCreate < b.dateOfCreate) {
    return 1
  }
  return 0
}

/**
 * С какого номера отображать документы на странице
 * @param nowNumberOfPage 
 * @param numOnPage 
 * @returns 
 */
export function getNumberStart(nowNumberOfPage: string, numOnPage: number): number {
  return (Number(nowNumberOfPage)-1)*numOnPage
}

/**
 * По какой номер отображать данные на странице
 * @param nowNumberOfPage 
 * @param numOnPage 
 * @returns 
 */
export function getNumberEnd(nowNumberOfPage: string, numOnPage: number): number {
  return (Number(nowNumberOfPage)*numOnPage)
}

/**
 * Вычисляет максимально возможный номер страницы 
 * с учетом количества всех документов
 * высоты экрана
 * высоты документа
 * @param numDocuments 
 * @param height 
 * @param heightDoc 
 * @returns 
 */
export function getMaxPages(
  numDocuments: number,
  height: number,
  heightDoc: number
): number {
  return Math.ceil( numDocuments / (Math.floor(height / heightDoc)) )
}
