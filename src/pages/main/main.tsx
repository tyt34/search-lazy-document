import { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import './main.scss'
import Menu from './components/menu/menu'
import List from './components/list/list'
import Pagi from './components/pagi/pagi'
import { numDocuments, heightDoc } from "../../shared/constants/const"

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

  useEffect( () => {
    setNumOnPage(Math.floor(height / heightDoc))
    setMaxPages(Math.ceil( numDocuments / (Math.floor(height / 60)) ))
  }, [height])

  console.log(' H: ', height)
  console.log(' N: ', numOnPage)
  console.log(' M: ', maxPages)

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
      <List />
    </div>
  )
}

export default Main

