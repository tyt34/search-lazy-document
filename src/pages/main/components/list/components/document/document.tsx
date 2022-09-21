import { useState } from 'react'
import './document.scss'
import { IDocument } from '../../../../../../shared/types/main'
import { delSymI } from '../../../../../../shared/utils/main'

function Document({text, title, dateOfCreate}: IDocument) {
  const [open, setOpen] = useState<boolean>(false)

  function openDamper() {
    setOpen(!open)
  }

  return (
    <div 
      className='document'
    >
      <div
        className='document__damper'
        onClick={openDamper}
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