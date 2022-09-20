import './menu.scss'
import { useState } from "react"
import Select from 'react-select'

const options = [
  { value: 'Создан', label: 'Создан' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' }
]

function Menu() {
  const [messageId, setMessageId] = useState<string>('')
  const [messageDate, setMessageDate] = useState<string>('')
  const [messageName, setMessageName] = useState<string>('')
  
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
        className='menu__id-input'
        type="text" 
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
        <input 
          className='menu__date-input menu__date-input-from'
          type="text" 
        />
        <input 
          className='menu__date-input menu__date-input-to'
          type="text" 
        />
      </div>

      <p
        className='menu__message menu__name-message'
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
        className='menu__name-input'
        type="text" 
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
          isClearable={true}
          className='menu__sort-select menu__sort-options'
          options={options}
          defaultValue={options[0]}
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
          options={options}
          defaultValue={options[0]}
        />
      </div>
      
    </div>
  )
}

export default Menu