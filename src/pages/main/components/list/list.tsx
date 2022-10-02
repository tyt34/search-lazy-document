import React, { memo } from 'react'
import './list.scss'
import { IDocumentID, IImgMemory } from '../../../../shared/types/main'
import Document from './components/document/document'

interface Props {
  showData: IDocumentID[]
  //setMemoryImgLinks: (obj: IImgMemory) => void
  //memoryImgLinks: IImgMemory[]
}

function List(
  {
    showData,
    //setMemoryImgLinks,
    //memoryImgLinks
  }: Props): React.ReactElement {

  console.log(' sh: ', showData)

  return (
    <div
      className='list'
    >
      {
        showData.map((obj) => (
          <Document
            key={obj.id}
            data={obj}
          />
        ))
      }
    </div>
  )
}

export default memo(List)

//export default List


//const ChildMemo = React.memo(Child);
