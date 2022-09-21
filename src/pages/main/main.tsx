import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import './main.scss'
import Menu from './components/menu/menu'
import List from './components/list/list'
import Pagi from './components/pagi/pagi'
import { numDocuments, heightDoc } from "../../shared/constants/const"
import { getMessages } from '../../shared/api/main'
import { IDocumentID, objectFromApi } from '../../shared/types/main'

const emptyObject = [
  {
    id: 0,
    title: '',
    text: '',
    dateOfCreate: new Date('2005-11-25T12:00:00.000Z'),
  }
]

function Main() {
  /**
   * номер текущей страницы
   */
  let { nowNumberOfPage } = useParams()
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
   * Все документы полученные с помощью API
   */
  const [data, setData] = useState<IDocumentID[]>(emptyObject)
  const [showData, setShowData] = useState<IDocumentID[]>(emptyObject)

  useEffect( () => {
    getMessages()
      .then( (res) => {
        let changedData = res.map( (obj: objectFromApi) => {
          return {
            id: obj.id,
            title: obj.answer,
            text: obj.question,
            dateOfCreate: obj.airdate
          }
        })
        setData(changedData)
      })
  }, [])

  //console.log(' now: ', nowNumberOfPage)

  const { height } = useWindowDimensions()

  function useWindowDimensions() {
    const [windowDimensions, setWindowDimensions] = useState(
      getWindowDimensions()
    )

    useEffect(() => {
      function handleResize() {
        setWindowDimensions(getWindowDimensions())
      }

      window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
      }, [])

    return windowDimensions
  }

  function getWindowDimensions() {
    const { innerHeight: height } = window

    return {
      height
    }
  }

  // преобразования происходят при загрузке данных
  // при изменение высоты экрана
  // при изменение страницы
  useEffect( () => {
    setNumOnPage(Math.floor(height / heightDoc))
    setMaxPages(Math.ceil( numDocuments / (Math.floor(height / 60)) ))
    //setShowData

    const numberFrom = (Number(nowNumberOfPage)-1)*numOnPage
    const numberTo = (Number(nowNumberOfPage)*numOnPage)
    console.log(' текущая страница: ', nowNumberOfPage)
    console.log(' на сранице может уместиться: ', numOnPage)
    console.log(' всего может быть страниц: ', maxPages)

    console.log(' первое, с какого элемента нам брать: ', numberFrom)
    console.log(' по какой элемент: ', numberTo)

    /*
    let arrForShow = data.map( (el, i) => {
      console.log(' i: ', i)
    })
    */

    console.log(' d: ', data)

    let arrForShow = data.slice(numberFrom, numberTo)
    setShowData(arrForShow)

  }, [height, data, nowNumberOfPage])

  //console.log(' H: ', height)
  //console.log(' N: ', numOnPage)
  //console.log(' M: ', maxPages)

  return (
    <div
      className='main'
    >
      <section
        className='main__left'
      >
        <Menu />
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

