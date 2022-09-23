import './menu.scss'
import { useEffect, useState } from "react"
import Select from 'react-select'
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import { 
  IDocumentID, 
  ISelectDirection, 
  ISelectType 
} from '../../../../shared/types/main'
import { 
  getRandomInt,
  sortNameUp,
  sortNameDown,
  sortDateDown,
  sortDateUp
 } from '../../../../shared/utils/main'
import { useNavigate, useParams } from 'react-router-dom'

const defaultSeletType: ISelectType = { value: 'no', label: 'Не сортировать' }
const defaultSelectDirection: ISelectDirection = { value: 'up', label: 'По возрастанию' }

const optionsType = [
  defaultSeletType,
  { value: 'date', label: 'По дате' },
  { value: 'name', label: 'По имени' },
]

const optionsDirection = [
  defaultSelectDirection,
  { value: 'down', label: 'По убыванию' },
]

interface Props {
  data: IDocumentID[],
  setFilterData: (objects: IDocumentID[]) => void,
  notSortData: IDocumentID[],
  setData: (objects: IDocumentID[]) => void,
  filterData: IDocumentID[]
}

function Menu({data, setFilterData, notSortData, setData, filterData}: Props) {
  const navigate = useNavigate()
  let { nowNumberOfPage } = useParams()

  const [messageId, setMessageId] = useState<string>('')
  const [messageName, setMessageName] = useState<string>('')
  const [messageDate, setMessageDate] = useState<string>('')

  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  
  const [id, setId] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [type, setType] = useState<ISelectType>(defaultSeletType)
  const [direction, setDirection] = useState<ISelectDirection>(defaultSelectDirection)

  function handleChangeId(e: React.ChangeEvent<HTMLInputElement>) {
    setId(e.target.value)
    setName('')
  }

  function handleChangeName(e: React.ChangeEvent<HTMLInputElement>) {
    setName(e.target.value)
    setId('')
    navigate('/1')
  }

  function handeIdFocus() {
    setMessageId(' Пример id: ' + data[getRandomInt(data.length)].id)

    const timer = setTimeout(() => {
      setMessageId('')
    }, 10000)
    return () => clearTimeout(timer);
  }

  function handeDateFocus() {
    setMessageDate(' Пример даты: ' + data[getRandomInt(data.length)].dateOfCreate.toString().split('T')[0])

    const timer = setTimeout(() => {
      setMessageDate('')
    }, 10000)
  }

  function handleButton() {
    setFilterData([])
    setId('')
    setName('')
    setType(defaultSeletType)
    setData([...notSortData])
    /**
     * это костыль для того, чтобы сбрасывать поиск
     * если вы на первой странице перейдете на вторую
     * если вы не на первой перейдете на первую
     */
    if (nowNumberOfPage === '1') {
      navigate('/2')
    } else {
      navigate('/1')
    }
  }

  function handlePressKeyId(e: React.KeyboardEvent) {
    if (e.code === 'NumpadEnter' || e.code === 'Enter') {    
      data.map( (obj: IDocumentID) => {
        if (obj.id === Number(id)) {
          setFilterData([obj])
        }
      })
    }
  }

  function handlePressKeyName(e: React.KeyboardEvent) {
    if (e.code === 'NumpadEnter' || e.code === 'Enter') {    
      let resultSearch: IDocumentID[] = []
      data.map( (obj: IDocumentID) => {
        if (obj.title.toLocaleLowerCase().indexOf(name.toLocaleLowerCase()) > -1) {
          resultSearch.push(obj)
        }
      })
      setFilterData(resultSearch)
    }
  }

  useEffect( () => {
    data.map( (obj: IDocumentID) => {
      if (obj.id === Number(id)) {
        setFilterData([obj])
        navigate('/1')
      }
    })
  }, [id])

  useEffect( () => {
    let resultSearch: IDocumentID[] = []
    data.map( (obj: IDocumentID) => {
      if (obj.title.toLocaleLowerCase().indexOf(name.toLocaleLowerCase()) > -1) {
        resultSearch.push(obj)
      }
    })
    setFilterData(resultSearch)

    if (name !== '') {
      setMessageName(' Найдено: ' + resultSearch.length)
    }

    const timer = setTimeout(() => {
      setMessageName('')
    }, 10000)
  }, [name])

  useEffect( () => {
    let resultSearch: IDocumentID[] = []
    data.map( (obj: IDocumentID) => {
      if (
        new Date(obj.dateOfCreate) > startDate
        &&
        new Date(obj.dateOfCreate) < endDate
      ) {
        resultSearch.push(obj)
      }
      setFilterData(resultSearch)
    })
  }, [startDate, endDate])

  useEffect( () => {
    let arrForSort: IDocumentID[] = filterData.length === 0 ? data : filterData
    let arrResultSort: IDocumentID[] = []

    if (type.value === 'date' && direction.value === 'up') {
      arrResultSort = arrForSort.sort(sortDateUp)
    } else if (type.value === 'date' && direction.value === 'down') {
      arrResultSort = arrForSort.sort(sortDateDown)
    } else if (type.value === 'name' && direction.value === 'up') {
      arrResultSort = arrForSort.sort(sortNameUp)
    } else if (type.value === 'name' && direction.value === 'down') {
      arrResultSort = arrForSort.sort(sortNameDown)
    } else if (type.value === 'no') {
      arrResultSort = notSortData
    }

    if (filterData.length === 0) {
      setData([...arrResultSort])
    } else {
      setFilterData([...arrResultSort])
    }
  }, [type, direction])

  return (
    <div 
      className='menu'
    >
      <p
        className='menu__message menu__id-message'
      >
        {messageId}
      </p>
      <p
        className='menu__title menu__id-title'
      >
        <b>
          ID документа
        </b>
      </p>
      <input 
        className='menu-input menu__id-input'
        type="number"
        value={id}
        onChange={handleChangeId}
        onFocus={handeIdFocus}
        onKeyPress={ (e: React.KeyboardEvent) => { handlePressKeyId(e)}}
      />

      <p
        className='menu__message menu__date-message'
      >
        {messageDate}
      </p>
      <p
        className='menu__title menu__date-title'
      >
        <b>
          Создан
        </b>
      </p>
      <div
        className='menu__date-inputs'
      >
        <DatePicker 
          className='menu-input menu__date-input menu__date-input-start'
          selected={startDate} 
          onChange={(date:Date) => setStartDate(date)} 
          onFocus={handeDateFocus}
        />
        <DatePicker 
          className='menu-input menu__date-input menu__date-input-end'
          selected={endDate} 
          onChange={(date:Date) => setEndDate(date)} 
          onFocus={handeDateFocus}
        />
      </div>

      <p
        className='menu__message menu__date-message'
      >
        {messageName}
      </p>
      <p
        className='menu__title menu__name-title'
      >
        <b>
          Наименование
        </b>
      </p>
      <input 
        className='menu-input menu__name-input'
        type="text"
        value={name}
        onChange={handleChangeName}
        onKeyPress={ (e: React.KeyboardEvent) => { handlePressKeyName(e)}}
      />

      <div
        className='menu__sort'
      >
        <p
          className='menu__title menu__sort-title'
        >
          <b>
            Тип сортировки
          </b>
        </p>
        <Select
          value={type}
          isClearable={true}
          className='menu__sort-select menu__sort-options'
          options={optionsType}
          defaultValue={optionsType[0]}
          onChange={ (select) => {
            if (select !== null) {
              setType(select)
            }
          }}
        />
        <p
          className='menu__title menu__sort-title'
        >
          <b>
            Направление сортировки
          </b>
        </p>
        <Select
          isClearable={true}
          className='menu__sort-select menu__sort-direction'
          options={optionsDirection}
          defaultValue={optionsDirection[0]}
          onChange={ (select) => {
            if (select !== null) {
              setDirection(select)
            }
          }}
        />
      </div>

      <button
        className='menu__button-restart'
        onClick={handleButton}
      >
        Сбросить
      </button>
      
    </div>
  )
}

export default Menu