import { 
  delSymI, 
  getButtonsForPagi, 
  sortNameUp,
  sortNameDown,
  sortDateDown,
  sortDateUp,
  getNumberStart,
  getNumberEnd,
  getMaxPages
} from "./main"
import { IDocumentID } from "../types/main"

import { 
  numDocuments,
  heightDoc
} from "../constants/const"

const arrTestSort: IDocumentID[] = [
  {
    id: 1,
    title: 'a-title',
    text: 'text',
    dateOfCreate: new Date('1917-11-07T12:13:14.000Z'),
  },
  {
    id: 3,
    title: 'c-title',
    text: 'text',
    dateOfCreate: new Date('3017-11-07T12:13:14.000Z'),
  },
  {
    id: 2,
    title: 'b-title',
    text: 'text',
    dateOfCreate: new Date('2017-11-07T12:13:14.000Z'),
  }
]

const arrTestSortResultUp: IDocumentID[] = [
  {
    id: 1,
    title: 'a-title',
    text: 'text',
    dateOfCreate: new Date('1917-11-07T12:13:14.000Z'),
  },
  {
    id: 2,
    title: 'b-title',
    text: 'text',
    dateOfCreate: new Date('2017-11-07T12:13:14.000Z'),
  },
  {
    id: 3,
    title: 'c-title',
    text: 'text',
    dateOfCreate: new Date('3017-11-07T12:13:14.000Z'),
  },
]

const arrTestSortResultDown: IDocumentID[] = [
  {
    id: 3,
    title: 'c-title',
    text: 'text',
    dateOfCreate: new Date('3017-11-07T12:13:14.000Z'),
  },
  {
    id: 2,
    title: 'b-title',
    text: 'text',
    dateOfCreate: new Date('2017-11-07T12:13:14.000Z'),
  },
  {
    id: 1,
    title: 'a-title',
    text: 'text',
    dateOfCreate: new Date('1917-11-07T12:13:14.000Z'),
  },
]

describe('sum module', () => {  
  test(' тест, показывающий работу функции delSymI ', () => {
    expect(delSymI(' abc ')).toBe(' abc ')
  })

  test(' тест, показывающий работу функции delSymI ', () => {
    expect(delSymI('<i> abc </i>')).toBe(' abc ')
  })

  test(' тест, показывающий работу функции getButtonsForPagi ', () => {
    expect(getButtonsForPagi(1, 10, 5)).toEqual([1, 2, 3, 4, 5])
  })

  test(' тест, показывающий работу функции getButtonsForPagi ', () => {
    expect(getButtonsForPagi(5, 10, 5)).toEqual([3, 4, 5, 6, 7])
  })

  test(' тест, показывающий работу функции getButtonsForPagi ', () => {
    expect(getButtonsForPagi(9, 10, 5)).toEqual([6, 7, 8, 9, 10])
  })

  test(' тест, показывающий работу функции getButtonsForPagi ', () => {
    expect(getButtonsForPagi(5, 11, 6)).toEqual([2, 3, 4, 5, 6, 7])
  })

  test(` тест, показывающий работу функции getButtonsForPagi. 
  В данном примере пользователь находится на номере страницы, 
  который больше чем максиамальное количество страниц. `, () => {
    expect(getButtonsForPagi(999, 10, 5)).toEqual([6, 7, 8, 9, 10])
  })
  
  test(' тест, показывающий сортировку sortNameUp. Результат: title по возрастания (a-z) ', () => {
    expect(arrTestSort.sort(sortNameUp)).toEqual(arrTestSortResultUp)
  })
  
  test(' тест, показывающий сортировку sortNameDown. Результат: title по убыванию (z-a) ', () => {
    expect(arrTestSort.sort(sortNameDown)).toEqual(arrTestSortResultDown)
  })

  test(' тест, показывающий сортировку sortDateUp. Результат: date по убыванию (1-100) ', () => {
    expect(arrTestSort.sort(sortDateUp)).toEqual(arrTestSortResultUp)
  })

  test(' тест, показывающий сортировку sortDateDown. Результат: date по убыванию (100-1) ', () => {
    expect(arrTestSort.sort(sortDateDown)).toEqual(arrTestSortResultDown)
  })

  test(' тест, показывающий работу функции getNumberStart ', () => {
    expect(getNumberStart('1', 999)).toBe(0)
  })

  test(' тест, показывающий работу функции getNumberStart ', () => {
    expect(getNumberStart('2', 10)).toBe(10)
  })

  test(' тест, показывающий работу функции getNumberStart ', () => {
    expect(getNumberStart('9', 10)).toBe(80)
  })

  test(' тест, показывающий работу функции getNumberEnd ', () => {
    expect(getNumberEnd('1', 10)).toBe(10)
  })

  test(' тест, показывающий работу функции getNumberEnd ', () => {
    expect(getNumberEnd('2', 10)).toBe(20)
  })

  test(' тест, показывающий работу функции getNumberEnd ', () => {
    expect(getNumberEnd('9', 10)).toBe(90)
  })

  test(` тест, показывающий работу функции getMaxPages. 
  По умолчанию numDocuments = 100, heightDoc = 60`, () => {
    expect(getMaxPages(numDocuments, 600, heightDoc)).toBe(10)
  })

  test(` тест, показывающий работу функции getMaxPages. 
  По умолчанию numDocuments = 100, heightDoc = 60`, () => {
    expect(getMaxPages(numDocuments, 70, heightDoc)).toBe(100)
  })

  test(` тест, показывающий работу функции getMaxPages. 
  По умолчанию numDocuments = 100, heightDoc = 60`, () => {
    expect(getMaxPages(numDocuments, 130, heightDoc)).toBe(50)
  })
})

