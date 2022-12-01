declare module 'react-query'
declare module 'sha1'
declare module 'styled-components'
declare module 'lodash'
declare module 'luxon'
declare module 'chart.js'

declare interface User {
  id: string
  name: string
  pwd: string
  author: boolean
}

declare interface Question {
  id: string
  subject: string
  step: string
  imgSrc: string
  questionYear: number
  questionMonth: number
  questionNumber: number
  questionSequence: number
  questionAnswer: number
  questionScore: number
  [sortKey: string] : number // 정렬용도
}

declare interface QuestionBook {
  id: string
  subject: string
  imgSrc: string
  questionBookSeq: number
  questionBookTitle: string
  questionBookPrice: number
  questionBookDetail: string
  questionBookShop: string
  questionBookpdf: string
}

declare type Subject = "physical" | "chemical"