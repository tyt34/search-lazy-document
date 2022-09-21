import { useParams } from "react-router-dom";
import './pagi.scss'
import { getButtonsForPagi } from "../../../../shared/utils/main"
import { useEffect, useState } from "react"
import { maxAmountButtonsOnPage } from "../../../../shared/constants/const"
import { useNavigate} from 'react-router-dom'

interface Props {
  numOnPage: number,
  maxPages: number,
}

function Pagi({numOnPage, maxPages}: Props) {
  let { nowNumberOfPage } = useParams()
  const [arrButtons, setArrButtons] = useState<number[]>([1])
  const navigate = useNavigate()
  
  useEffect( () => {
    setArrButtons(getButtonsForPagi(Number(nowNumberOfPage), maxPages, maxAmountButtonsOnPage))
  }, [numOnPage, maxPages, nowNumberOfPage])

  function changePage(button: number) {
    navigate('#/'+button)
  }

  return (
    <div
      className='pagi'
    >
      {
        arrButtons.map( (button) => (
          <a
            key={button}
            href={'#/'+button.toString()}
          >
            <div
              className={
                Number(nowNumberOfPage) === button ?
                "pagi__button pagi__button-selet"
                :
                "pagi__button"
              }
              onClick={ () => {changePage(button)}}
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

