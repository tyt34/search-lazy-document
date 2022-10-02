import React from 'react'
import './list.scss'
import { IDocumentID, IImgMemory } from '../../../../shared/types/main'
import Document from './components/document/document'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../app/store'

interface Props {
  showData: IDocumentID[]
}

function List(
  {
    showData
  }: Props): React.ReactElement {
  const memoryImgLinks = useSelector((store: RootState) => store.memoryImgLinks)

  function getImgFromMemory(title: string): string | undefined {
    let result
    if (memoryImgLinks.some((el: IImgMemory) => {
      return el.title === title
    })) {
      memoryImgLinks.forEach((el) => {
        if (el.title === title) {
          result = el.image
        }
      })
    } else {
      result = undefined
    }
    return result
  }

  return (
    <div
      className='list'
    >
      {
        showData.map((obj) => (
          <Document
            key={obj.id}
            data={obj}
            imgFromMemory={getImgFromMemory(obj.title)}
          />
        ))
      }
    </div>
  )
}

export default List
