import React, { useEffect, useState, memo } from 'react'
import './document.scss'
import { IDocumentID, IImgMemory } from '../../../../../../shared/types/main'
import { getImg } from '../../../../../../shared/api/main'
import { addImgInMemory } from '../../../../main.slice'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../../../app/store'

interface Props {
  data: IDocumentID
  //setMemoryImgLinks: (obj: IImgMemory) => void
  //memoryImgLinks: IImgMemory[]
}

function Document(
  {
    data,
    //setMemoryImgLinks,
    //memoryImgLinks
  }: Props): React.ReactElement {
  const dispatch = useDispatch()
  const { id, title, text, dateOfCreate } = data
  const [open, setOpen] = useState<boolean>(false)
  const [numClickOnDamper, setNumClickOnDamper] = useState<number>(0)
  const [img, setImg] = useState<string>('')
  const [statusInMemory, setstatusInMemory] = useState<boolean>(false)
  const memoryImgLinks = useSelector((store: RootState) => store.memoryImgLinks)

  console.log(' d: ', title)

  useEffect(() => {
    
    setstatusInMemory(
      memoryImgLinks.some((el: IImgMemory) => {
        return el.title === title
      })
    )

    memoryImgLinks.forEach((el) => {
      if (el.title === title) {
        setImg(el.image)
      }
    })
    
  }, [])

  function openCloseDamper(): void {
    setNumClickOnDamper(numClickOnDamper + 1)
    setOpen(!open)
  }

  /**
   * отложенная загрузка изображения срабатывающая только при первом открытие спойлера
   * если до этого изображение не сохранялось
   */
  useEffect(() => {
    if (!statusInMemory && numClickOnDamper === 1) {
      getImg()
        .then((res) => {
          setImg(res.image)
          dispatch(
            addImgInMemory(
              {
                title,
                image: res.image
              }
            )
          )
        })
    }
  }, [numClickOnDamper])

  return (
    <div
      className='document'
    >
      <div
        className='document__damper'
        onClick={openCloseDamper}
      >
        <p
          className='document__title'
        >
          {title}
        </p>
        <p
          className='document__forvard-damper'
        >
          {
            open ? 'Λ' : 'V'
          }
        </p>
      </div>

      <div
        className={
          open ? 'document__info' : 'document__info-close'
        }
      >
        <p
          className='document__text'
        >
          {text}
        </p>

        <img
          className='document__img'
          src={img}
          alt=""
        />

        <p
          className='document__date'
        >
          Дата создания: {dateOfCreate.toString().split('T')[0]}
        </p>
        <p
          className='document__id'
        >
          ID: {id}
        </p>
      </div>

    </div>
  )
}

//export default Document
export default memo(Document)