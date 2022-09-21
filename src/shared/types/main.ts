export interface objectFromApi {
  /**
   * id 
   */
  id: number,
  /**
   * В данном API это вопрос. 
   * В данном приложение это название документа
   */
  answer: string,
  /**
   * В данном API это ответ на вопрос.
   * В данном приложение это ответ на вопрос
   */
  question: string,
  /**
   * В данном приложение это дата создания документа
   */
  airdate: Date,
  value: number,
  created_at: Date,
  updated_at: Date,
  category_id: number,
  game_id: number,
  invalid_count: null,
  category: {
    id: number,
    title: string,
    created_at: Date,
    updated_at: Date,
    clues_count: number,
  }
}

export interface IDocument {
  /**
   * В данном приложение это название документа
   */
  title: string,
  /**
   * В данном приложение это ответ на вопрос
   */
  text: string,
  /**
   * В данном приложение это дата создания документа
   */
  dateOfCreate: Date,
}

export interface IDocumentID extends IDocument {
  /**
   * id 
   */
  id: number,
}

export interface imgApi {
  /**
   * В данном апи на картинке будет изображен или ответ да, или нет
   */
  answer: 'yes' | 'no',
  forced: boolean,
  /**
   * ссылка на изображение, на котором будет анимационный ответ
   */
  image: string,
}

export interface IImgMemory {
  title: string,
  image: string
}