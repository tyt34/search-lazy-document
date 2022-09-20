import { useEffect, useState } from 'react'
import './list.scss'
import { IDocument, objectFromApi } from '../../shared/types/main'
import { getMessages } from '../../shared/api/main'
import Document from './document/document'

const emptyObject = [
  {
    id: 0,
    title: '',
    text: '',
    dateOfCreate: new Date('2005-11-25T12:00:00.000Z'),
  }
]

function List() {
  const [data, setData] = useState<IDocument[]>(emptyObject)

  useEffect( () => {
    getMessages()
      .then( (res) => {
        console.log(' res: ', res)
        let changedData = res.map( (obj: objectFromApi) => {
          return {
            id: obj.id,
            title: obj.answer,
            text: obj.question,
            dateOfCreate: obj.airdate
          }
        })
        setData(changedData)
        console.log(' -> ', changedData)
      })
  }, [])

  return (
    <div 
      className='list'
    >
      {
        data.map( (obj) => (
          <>
          </>
        ))
      }
    </div>
  )
}

export default List