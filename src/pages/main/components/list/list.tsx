import './list.scss'
import { IDocumentID, IImgMemory } from '../../../../shared/types/main'
import Document from './components/document/document'

interface Props {
  showData: IDocumentID[],
  setMemoryImgLinks: (obj: IImgMemory) => void,
  memoryImgLinks: IImgMemory[],
}

function List({showData, setMemoryImgLinks, memoryImgLinks}: Props) {
  return (
    <div 
      className='list'
    >
      {
        showData.map( (obj) => (
          <Document
            key={obj.id}
            data={obj}
            setMemoryImgLinks={setMemoryImgLinks}
            memoryImgLinks={memoryImgLinks}
          />
        ))
      }
    </div>
  )
}

export default List