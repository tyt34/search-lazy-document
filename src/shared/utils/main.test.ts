import { delSymI, getButtonsForPagi } from "./main"

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
})

