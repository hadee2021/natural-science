declare module 'react-query'
declare module 'sha1'
declare module 'styled-components'

declare interface User {
  id: string
  name: string
  pwd: string
  author: boolean
  checkQuestion: string[]
}

declare interface Question {
  id: string
  subject: string
  step: string
  imgSrc: string
  questionYear: string
  questionMonth: string
  questionNumber: number
  questionSequence: number
  questionAnswer: number
  questionScore: number
}

declare type Subject = "physical" | "chemical"