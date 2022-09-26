import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import './pagi.scss'
import { getButtonsForPagi } from '../../../../shared/utils/main'
import { maxAmountButtonsOnPage } from '../../../../shared/constants/const'

interface Props {
  numOnPage: number
  maxPages: number
}

function Pagi({ numOnPage, maxPages }: Props): React.ReactElement {
  const { nowNumberOfPage } = useParams()
  const [arrButtons, setArrButtons] = useState<number[]>([1])
  const navigate = useNavigate()

  useEffect(() => {
    setArrButtons(getButtonsForPagi(Number(nowNumberOfPage), maxPages, maxAmountButtonsOnPage))
  }, [numOnPage, maxPages, nowNumberOfPage])

  function changePage(button: number): void {
    navigate('#/' + button.toString())
  }

  return (
    <div
      className='pagi'
    >
      {
        arrButtons.map((button) => (
          <a
            key={button}
            href={'#/' + button.toString()}
          >
            <div
              className={
                Number(nowNumberOfPage) === button
                  ? 'pagi__button pagi__button-selet'
                  : 'pagi__button'
              }
              onClick={ () => { changePage(button) }}
            >
              {button}
            </div>
          </a>
        ))
      }
    </div>
  )
}

export default Pagi
