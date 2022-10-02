import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { IDocumentID, IImgMemory } from '../../shared/types/main'

interface Props {
  /**
   * Документы полученные и преобразованные с помощью API
   * используемые для сброса сортировки
   */
  originData: IDocumentID[]
  /**
   * Массив для сохранение ссылок на изображения
   * Например вы открыли документ,
   * затем сменили страницу,
   * вернулись обратно на прежнюю страницу
   * и снова открыли предыдущий документ
   * Картинка в этом случае будет прежняя
   */
  memoryImgLinks: IImgMemory[]
  /**
   * Документы, которые отображаются на странице для пользователя
   */
  showData: IDocumentID[]
}

const initialState: Props = {
  originData: [],
  memoryImgLinks: [],
  showData: []
}

export const counterReducer = createSlice({
  name: 'data',
  initialState,
  reducers: {
    getDataFromApi: (state, action: PayloadAction<IDocumentID[]>) => {
      state.originData = action.payload
    },
    addImgInMemory: (state, action: PayloadAction<IImgMemory>) => {
      state.memoryImgLinks = [...state.memoryImgLinks, action.payload]
    },
    createDataForShow: (state, action: PayloadAction<IDocumentID[]>) => {
      state.showData = action.payload
    }
  }
})

export const { getDataFromApi, addImgInMemory, createDataForShow } = counterReducer.actions
