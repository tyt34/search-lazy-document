import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import './main.scss'
import Menu from './components/menu/menu'
import List from './components/list/list'
import Pagi from './components/pagi/pagi'
import {
  numDocuments,
  heightDoc
} from '../../shared/constants/const'
import { getMessages } from '../../shared/api/main'
import {
  IDocumentID
} from '../../shared/types/main'
import {
  delSymI,
  getNumberStart,
  getNumberEnd,
  getMaxPages
} from '../../shared/utils/main'
import { getDataFromApi } from './main.slice'

function Main(): React.ReactElement {
  const dispatch = useDispatch()
  /**
   * номер текущей страницы
   */
  const { nowNumberOfPage } = useParams()
  /**
   * количество документов, которое может уместиться на странице
   */
  const [numOnPage, setNumOnPage] = useState<number>(1)
  /**
   * максимальное количество страниц на которые можно разделить все
   * документы, если на одну страницу умещается numOnPage документов
   */
  const [maxPages, setMaxPages] = useState<number>(1)
  /**
   * Все документы полученные и преобразованные с помощью API
   */
  const [data, setData] = useState<IDocumentID[]>([])
  /**
   * Документы, которые отображаются на странице для пользователя
   */
  const [showData, setShowData] = useState<IDocumentID[]>([])
  /**
   * Массив документов, которые формируется за счет фильтрации
   * при использование меню
   */
  const [filterData, setFilterData] = useState<IDocumentID[]>([])

  function changeFilterData(objects: IDocumentID[]): void {
    setFilterData(objects)
  }

  function changeData(objects: IDocumentID[]): void {
    setData(objects)
  }

  useEffect(() => {
    getMessages()
      .then((res) => {
        const changedData = res.map((obj) => {
          return {
            id: obj.id,
            title: delSymI(obj.answer),
            text: obj.question,
            dateOfCreate: obj.airdate
          }
        })
        setData([...changedData])
        dispatch(getDataFromApi(changedData))
      })
  }, [])

  const { height } = useWindowDimensions()

  function useWindowDimensions(): { height: number } {
    const [windowDimensions, setWindowDimensions] = useState(
      getWindowDimensions()
    )

    useEffect(() => {
      function handleResize(): void {
        setWindowDimensions(getWindowDimensions())
      }

      window.addEventListener('resize', handleResize)
      return () => window.removeEventListener('resize', handleResize)
    }, [])

    return windowDimensions
  }

  function getWindowDimensions(): { height: number } {
    const { innerHeight: height } = window

    return {
      height
    }
  }

  /**
   * преобразования происходят при загрузке данных
   * при изменение высоты экрана
   * при изменение страницы
   */
  useEffect(() => {
    setNumOnPage(Math.floor(height / heightDoc))

    const numberStart = getNumberStart(
      nowNumberOfPage ?? '1',
      numOnPage
    )
    const numberEnd = getNumberEnd(
      nowNumberOfPage ?? '1',
      numOnPage
    )

    let arrForShow

    /**
     * Отображаются,
     * Или данные фильтрации,
     * если она использовалась,
     * и если найдены хоть какие то данные,
     * ИЛИ все данные
     *
     * else это проверка на случай, если перейти на максимальную страницу
     * затем увеличить экран, тогда возникает противоречие
     * например: максимум 10 на экарне, и вы на 10 странице
     * увеличиваете экран, на нем умещается максимум 15
     * получается нужны данные за пределом доступности
     */

    if (filterData.length > 0) {
      setMaxPages(getMaxPages(filterData.length, height, heightDoc))
      if (numberStart > numDocuments) {
        arrForShow = filterData.slice(numDocuments - numOnPage, numDocuments + 1)
      } else {
        arrForShow = filterData.slice(numberStart, numberEnd)
      }
    } else {
      setMaxPages(getMaxPages(numDocuments, height, heightDoc))
      if (numberStart > numDocuments) {
        arrForShow = data.slice(numDocuments - numOnPage, numDocuments + 1)
      } else {
        arrForShow = data.slice(numberStart, numberEnd)
      }
    }

    setShowData([...arrForShow])
  }, [height, data, filterData, nowNumberOfPage])

  return (
    <div
      className='main'
    >
      <section
        className='main__left'
      >
        <Menu
          data={data}
          filterData={filterData}
          setFilterData={changeFilterData}
          setData={changeData}
        />
        <Pagi
          numOnPage={numOnPage}
          maxPages={maxPages}
        />
      </section>
      <List
        showData={showData}
      />
    </div>
  )
}

export default Main