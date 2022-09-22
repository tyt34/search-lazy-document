import { useEffect, useState } from 'react'
import './document.scss'
import { IDocument, IImgMemory } from '../../../../../../shared/types/main'
import { delSymI } from '../../../../../../shared/utils/main'
import { getImg } from '../../../../../../shared/api/main'

export interface Props extends IDocument {
  setMemoryImgLinks: (obj: IImgMemory) => void,
  memoryImgLinks: IImgMemory[]
}

function Document({text, title, dateOfCreate, setMemoryImgLinks, memoryImgLinks}: Props) {
  const [open, setOpen] = useState<boolean>(false)
  const [numClickOnDamper, setNumClickOnDamper] = useState<number>(0)
  const [img, setImg] = useState<string>('')
  const [statusInMemory, setstatusInMemory] = useState<boolean>(false)

  useEffect( () => {
    setstatusInMemory(
      memoryImgLinks.some( (el: IImgMemory) => {
        return el.title === title
      })
    )

    memoryImgLinks.map( (el) => {
      if (el.title === title) {
        //console.log(' search img: ', el.image)
        setImg(el.image)
      }
    })
  }, [])

  function openCloseDamper() {
    setNumClickOnDamper(numClickOnDamper + 1)    
    setOpen(!open)
  }

  /**
   * отложенная загрузка изображения срабатывающая только при первом открытие спойлера
   * если до этого изображение не сохранялось
   */
  useEffect( () => {
    if (!statusInMemory && numClickOnDamper === 1) {
      getImg()
        .then( (res) => {
          setImg(res.image)

          setMemoryImgLinks({
            title,
            image: res.image
          })
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
          {delSymI(title)}
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
      </div>
      
    </div>
  )
}

export default Document