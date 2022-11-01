import { atom } from 'recoil'

export const questionDataAtom = atom({
  key: 'questionData',
  default: {
    id: '',
    subject: '',
    step: '',
    imgSrc: '',
    questionYear: 2023,
    questionMonth: 3,
    questionNumber: 1,
    questionSequence: 1,
    questionAnswer: 1,
    questionScore: 1
  }
})

export const IsQuestionUpdateAtom = atom({
  key: 'questionUpdate',
  default: false
})