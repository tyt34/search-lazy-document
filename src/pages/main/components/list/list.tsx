import { useEffect, useState } from 'react'
import './list.scss'
import { IDocumentID, objectFromApi } from '../../../../shared/types/main'
import { getMessages } from '../../../../shared/api/main'
import Document from './components/document/document'

interface Props {
  showData: IDocumentID[]
}

function List({showData}: Props) {
  return (
    <div 
      className='list'
    >
      {
        showData.map( (obj) => (
          <Document
            key={obj.id}
            title={obj.title}
            text={obj.text}
            dateOfCreate={obj.dateOfCreate}
          />
        ))
      }
    </div>
  )
}

export default List