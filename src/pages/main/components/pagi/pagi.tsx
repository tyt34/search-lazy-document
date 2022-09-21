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
  
  console.log(' now: ', nowNumberOfPage, numOnPage)

  useEffect( () => {
    //console.log(' => > ', getButtonsForPagi(Number(nowNumberOfPage), maxPages, maxAmountButtonsOnPage))
    setArrButtons(getButtonsForPagi(Number(nowNumberOfPage), maxPages, maxAmountButtonsOnPage))
  }, [numOnPage, maxPages, nowNumberOfPage])

  //console.log(' -> ', arrButtons)

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
            href={'#/'+button.toString()}
          >
            <div
              key={button}
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

